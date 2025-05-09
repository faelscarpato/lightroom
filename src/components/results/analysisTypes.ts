
export interface AnalysisResult {
  light: {
    exposure: string;
    contrast: string;
    highlights: string;
    shadows: string;
    whites: string;
    blacks: string;
    explanation?: string;
  };
  color: {
    temperature: string;
    tint: string;
    vibrance: string;
    saturation: string;
    hsl: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      aqua: string;
      blue: string;
      purple: string;
      magenta: string;
    };
    explanation?: string;
  };
  effects: {
    texture: string;
    clarity: string;
    dehaze: string;
    vignette: string;
    grain: string;
    explanation?: string;
  };
  detail: {
    sharpness: string;
    noiseReduction: string;
    colorNoiseReduction: string;
    sharpnessMask: string;
    explanation?: string;
  };
  optics: {
    autoCorrections: string;
    chromaticAberration: string;
    manualAdjustments: string;
    explanation?: string;
  };
  profile: {
    adobeProfile: string;
    customProfile: string;
    explanation: string;
  };
  masks: {
    type: string;
    settings: {
      light: string;
      color: string;
      effects: string;
      detail: string;
    };
    explanation?: string;
  }[];
}
