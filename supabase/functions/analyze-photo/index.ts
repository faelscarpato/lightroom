
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
      const jsonString = jsonMatch[0];
      const parsedJson = JSON.parse(jsonString);
      
      // Garantir que todos os campos estão presentes e são strings
      const sanitizedResult = ensureValidResultFormat(parsedJson);
      
      return sanitizedResult;
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

// Função para garantir que o formato do resultado é válido
function ensureValidResultFormat(data: any): any {
  // Cria uma estrutura básica de resultado
  const defaultResult = {
    light: {
      exposure: "0",
      contrast: "0",
      highlights: "0",
      shadows: "0",
      whites: "0",
      blacks: "0",
      explanation: "Sem ajustes de luz recomendados."
    },
    color: {
      temperature: "Como capturado",
      tint: "0",
      vibrance: "0",
      saturation: "0",
      hsl: {
        red: "Sem ajustes",
        orange: "Sem ajustes",
        yellow: "Sem ajustes",
        green: "Sem ajustes",
        aqua: "Sem ajustes",
        blue: "Sem ajustes",
        purple: "Sem ajustes",
        magenta: "Sem ajustes"
      },
      explanation: "Sem ajustes de cor recomendados."
    },
    effects: {
      texture: "0",
      clarity: "0",
      dehaze: "0",
      vignette: "Nenhum",
      grain: "Nenhum",
      explanation: "Sem efeitos recomendados."
    },
    detail: {
      sharpness: "Padrão",
      noiseReduction: "Nenhuma",
      colorNoiseReduction: "0",
      sharpnessMask: "0",
      explanation: "Sem ajustes de detalhe recomendados."
    },
    optics: {
      autoCorrections: "Desativado",
      chromaticAberration: "Nenhuma correção",
      manualAdjustments: "Nenhum",
      explanation: "Sem ajustes ópticos recomendados."
    },
    profile: {
      adobeProfile: "Adobe Color",
      customProfile: "N/A",
      explanation: "Perfil padrão recomendado."
    },
    masks: [{
      type: "Exemplo (não aplicável)",
      settings: {
        light: "N/A",
        color: "N/A",
        effects: "N/A",
        detail: "N/A"
      },
      explanation: "Nenhuma máscara recomendada."
    }]
  };

  // Combina o resultado da IA com o padrão, garantindo que todos os campos existam
  try {
    // Light settings
    if (data.light) {
      for (const key in defaultResult.light) {
        if (data.light[key] === undefined || data.light[key] === null) {
          data.light[key] = defaultResult.light[key];
        } else if (typeof data.light[key] !== 'string') {
          data.light[key] = String(data.light[key]);
        }
      }
    } else {
      data.light = defaultResult.light;
    }

    // Color settings
    if (data.color) {
      for (const key in defaultResult.color) {
        if (key === 'hsl') {
          if (!data.color.hsl) data.color.hsl = {};
          for (const hslKey in defaultResult.color.hsl) {
            if (data.color.hsl[hslKey] === undefined || data.color.hsl[hslKey] === null) {
              data.color.hsl[hslKey] = defaultResult.color.hsl[hslKey];
            } else if (typeof data.color.hsl[hslKey] !== 'string') {
              data.color.hsl[hslKey] = String(data.color.hsl[hslKey]);
            }
          }
        } else {
          if (data.color[key] === undefined || data.color[key] === null) {
            data.color[key] = defaultResult.color[key];
          } else if (typeof data.color[key] !== 'string') {
            data.color[key] = String(data.color[key]);
          }
        }
      }
    } else {
      data.color = defaultResult.color;
    }

    // Effects settings
    if (data.effects) {
      for (const key in defaultResult.effects) {
        if (data.effects[key] === undefined || data.effects[key] === null) {
          data.effects[key] = defaultResult.effects[key];
        } else if (typeof data.effects[key] !== 'string') {
          data.effects[key] = String(data.effects[key]);
        }
      }
    } else {
      data.effects = defaultResult.effects;
    }

    // Detail settings
    if (data.detail) {
      for (const key in defaultResult.detail) {
        if (data.detail[key] === undefined || data.detail[key] === null) {
          data.detail[key] = defaultResult.detail[key];
        } else if (typeof data.detail[key] !== 'string') {
          data.detail[key] = String(data.detail[key]);
        }
      }
    } else {
      data.detail = defaultResult.detail;
    }

    // Optics settings
    if (data.optics) {
      for (const key in defaultResult.optics) {
        if (data.optics[key] === undefined || data.optics[key] === null) {
          data.optics[key] = defaultResult.optics[key];
        } else if (typeof data.optics[key] !== 'string') {
          data.optics[key] = String(data.optics[key]);
        }
      }
    } else {
      data.optics = defaultResult.optics;
    }

    // Profile settings
    if (data.profile) {
      for (const key in defaultResult.profile) {
        if (data.profile[key] === undefined || data.profile[key] === null) {
          data.profile[key] = defaultResult.profile[key];
        } else if (typeof data.profile[key] !== 'string') {
          data.profile[key] = String(data.profile[key]);
        }
      }
    } else {
      data.profile = defaultResult.profile;
    }

    // Masks settings
    if (!Array.isArray(data.masks) || data.masks.length === 0) {
      data.masks = defaultResult.masks;
    } else {
      // Sanitize each mask
      data.masks = data.masks.map(mask => {
        const sanitizedMask = {
          type: typeof mask.type === 'string' ? mask.type : "Máscara sem nome",
          settings: {
            light: typeof mask.settings?.light === 'string' ? mask.settings.light : "N/A",
            color: typeof mask.settings?.color === 'string' ? mask.settings.color : "N/A",
            effects: typeof mask.settings?.effects === 'string' ? mask.settings.effects : "N/A",
            detail: typeof mask.settings?.detail === 'string' ? mask.settings.detail : "N/A"
          },
          explanation: typeof mask.explanation === 'string' ? mask.explanation : "Sem explicação fornecida."
        };
        return sanitizedMask;
      });
    }

    return data;
    
  } catch (error) {
    console.error("Erro ao sanitizar resposta:", error);
    return defaultResult;  // Retorna o resultado padrão em caso de erro
  }
}
