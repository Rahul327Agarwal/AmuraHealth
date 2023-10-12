import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material/styles';
import { colors } from './palettes.styles';

export const lightTheme: PaletteOptions = {
  colors,
};

export default function CreateCustomTheme(options: ThemeOptions) {
  return createTheme({
    palette: { ...lightTheme },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1050,
        lg: 1400,
        xl: 1750,
      },
    },
    typography: {
      fontFamily: ['Graphik'].join(','),
    },
    spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32],
    customShadows: {
      scroll: '4px 10px 24px rgb(0, 0, 0, 0.15)',
    },
    ...options,
  });
}
