export const theme = {
  colors: {
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: 'rgba(249, 115, 22, 0.1)',
    secondary: '#fb923c',
    secondaryLight: 'rgba(251, 146, 60, 0.1)',
    background: '#ffffff',
    sidebar: '#f3f3f3',
    surface: '#f3f3f3',
    surfaceHover: '#e5e5e5',
    surfaceBorder: '#e5e5e5',
    textPrimary: '#000000',
    textSecondary: '#666666',
    white: '#ffffff',
  },
  fonts: {
    body: "'Segoe UI', system-ui, -apple-system, sans-serif",
    heading: "'Segoe UI', system-ui, -apple-system, sans-serif",
    mono: "Consolas, 'Courier New', monospace",
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 40, 48],
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64],
  radii: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s ease-in-out',
  },
};

export type ThemeType = typeof theme;
