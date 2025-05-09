
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, category } = await req.json();

    if (!imageBase64) {
      throw new Error("Nenhuma imagem fornecida");
    }

    if (!category) {
      throw new Error("Categoria não especificada");
    }

    console.log(`Analisando imagem na categoria: ${category}`);

    // Construa a prompt baseada na categoria
    const prompt = generatePromptForCategory(category);
    
    // Envie a solicitação para a API Gemini
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GOOGLE_AI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64.split(',')[1] // Remove o prefixo "data:image/jpeg;base64,"
                }
              }
            ]
          }
        ],
        generation_config: {
          temperature: 0.4,
          top_p: 0.95,
          top_k: 40,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na API Gemini:", errorData);
      throw new Error(`Erro na API Gemini: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Nenhuma resposta gerada pelo modelo");
    }

    // Parse a resposta para o formato desejado
    const analysisText = data.candidates[0].content.parts[0].text;
    console.log("Resposta bruta da IA:", analysisText);
    
    const analysisResult = parseAIResponse(analysisText);
    
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Erro:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generatePromptForCategory(category: string): string {
  const basePrompt = `Analise esta fotografia na categoria "${category}" e forneça recomendações detalhadas de edição para Adobe Lightroom. Gere a saída exatamente no formato JSON abaixo, sem texto adicional antes ou depois:

{
  "light": {
    "exposure": "(valor com sinal, ex: +0.5)",
    "contrast": "(valor com sinal, ex: +15)",
    "highlights": "(valor com sinal)",
    "shadows": "(valor com sinal)",
    "whites": "(valor com sinal)",
    "blacks": "(valor com sinal)",
    "explanation": "(explicação das escolhas sobre luz)"
  },
  "color": {
    "temperature": "(valor em kelvin ou descrição)",
    "tint": "(valor com sinal)",
    "vibrance": "(valor com sinal)",
    "saturation": "(valor com sinal)",
    "hsl": {
      "red": "(descrição dos ajustes)",
      "orange": "(descrição dos ajustes)",
      "yellow": "(descrição dos ajustes)",
      "green": "(descrição dos ajustes)",
      "aqua": "(descrição dos ajustes)",
      "blue": "(descrição dos ajustes)",
      "purple": "(descrição dos ajustes)",
      "magenta": "(descrição dos ajustes)"
    },
    "explanation": "(explicação das escolhas de cor)"
  },
  "effects": {
    "texture": "(valor com sinal)",
    "clarity": "(valor com sinal)",
    "dehaze": "(valor com sinal)",
    "vignette": "(configurações de vinheta)",
    "grain": "(configurações de granulação)",
    "explanation": "(explicação dos efeitos escolhidos)"
  },
  "detail": {
    "sharpness": "(configurações de nitidez)",
    "noiseReduction": "(configurações de redução de ruído)",
    "colorNoiseReduction": "(valor)",
    "sharpnessMask": "(valor)",
    "explanation": "(explicação das escolhas de detalhe)"
  },
  "optics": {
    "autoCorrections": "(ativado/desativado)",
    "chromaticAberration": "(configuração)",
    "manualAdjustments": "(descrição dos ajustes)",
    "explanation": "(explicação das configurações ópticas)"
  },
  "profile": {
    "adobeProfile": "(nome do perfil Adobe recomendado)",
    "customProfile": "(perfil personalizado ou N/A)",
    "explanation": "(explicação da escolha do perfil)"
  },
  "masks": [
    {
      "type": "(tipo da máscara, ex: céu, sujeito, etc)",
      "settings": {
        "light": "(ajustes de luz para esta máscara)",
        "color": "(ajustes de cor para esta máscara)",
        "effects": "(ajustes de efeitos para esta máscara)",
        "detail": "(ajustes de detalhe para esta máscara)"
      },
      "explanation": "(explicação desta máscara)"
    }
  ]
}`;

  // Personalizações específicas por categoria
  const categorySpecificInstructions = {
    "Retrato": "Foque em tons de pele naturais, leve suavização de pele e destaque do sujeito. Considere máscaras para face, olhos ou cabelo se adequado.",
    "Paisagem": "Foque em céus vibrantes, horizontes diretos, e cores naturais mas impactantes. Considere máscaras para céu, montanhas ou água.",
    "Urbano": "Foque em contraste, linhas e formas arquitetônicas. Considere não saturar demais as cores artificiais.",
    "Produto": "Foque em detalhes precisos, cores fiéis ao produto e remoção de distrações.",
    "Arquitetura": "Foque em linhas retas, perspectivas corretas e detalhes estruturais.",
    "Casamento": "Foque em tons de pele agradáveis, cores suaves e destaque dos momentos importantes.",
    "Moda": "Foque em cores vibrantes ou mood específico, pele perfeita mas natural, e detalhes de roupas/acessórios.",
    "Comida": "Foque em cores apetitosas, detalhes de textura e criação de atmosfera convidativa.",
    "Criativa / Experimental": "Seja ousado com efeitos, contrastes e cores para criar um visual único e artístico."
  };

  // Obtém instruções específicas ou usa string vazia se a categoria não existir no mapa
  const specificInstructions = categorySpecificInstructions[category] || "";
  
  return `${basePrompt}\n\n${specificInstructions}\n\nLembre-se: gere APENAS o JSON válido, nada mais.`;
}

function parseAIResponse(response: string): any {
  try {
    // Primeiro, vamos tentar encontrar um objeto JSON dentro da resposta
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Se não conseguir identificar o JSON, retorna erro
    throw new Error("Formato de resposta inválido");
  } catch (error) {
    console.error("Erro ao analisar resposta:", error);
    // Retorna um objeto de erro estruturado
    return {
      error: "Não foi possível interpretar a resposta da IA",
      rawResponse: response
    };
  }
}
