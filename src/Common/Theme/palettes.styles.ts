import React from 'react';
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    colors: {
      gray: {
        900: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        100: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
        25: React.CSSProperties['color'];
      };
      green: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      red: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      orange: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      blue: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      system: {
        link: React.CSSProperties['color'];
        delete: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        divider: React.CSSProperties['color'];
        black: React.CSSProperties['color'];
      };
      theme: {
        primary: React.CSSProperties['color'];
        secondary: React.CSSProperties['color'];
        primaryLight: React.CSSProperties['color'];
      };
    };
    customShadow: {
      scroll: React.CSSProperties;
    };
  }
  interface PaletteOptions {
    colors: {
      gray: {
        900: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        100: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
        25: React.CSSProperties['color'];
      };
      green: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      red: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      orange: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      blue: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      system: {
        link: React.CSSProperties['color'];
        delete: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        divider: React.CSSProperties['color'];
        black: React.CSSProperties['color'];
      };
      theme: {
        primary: React.CSSProperties['color'];
        secondary: React.CSSProperties['color'];
        primaryLight: React.CSSProperties['color'];
      };
    };
  }
}

export let colors = {
  gray: {
    900: '#252427',
    500: '#5C5A61',
    400: '#A6A6A6',
    200: '#E9E8E8',
    100: '#E1E1E1',
    50: '#F1F1F1',
    25: '#F8F8F8',
  },
  green: {
    700: '#40916C',
    400: '#52B788',
    200: '#B7E4C7',
    50: '#D8F3DC',
  },
  red: {
    700: '#CC444B',
    400: '#DA5552',
    200: '#FBC3BC',
    50: '#FFE3E0',
  },
  orange: {
    700: '#E45C3A',
    400: '#F3752B',
    200: '#FFC8A8',
    50: '#FFE8DB',
  },
  blue: {
    700: '#0096C7',
    400: '#00B4D8',
    200: '#CAF0F8',
    50: '#E3FAFF',
  },
  system: {
    link: '#007AFF',
    delete: '#FF3B30',
    white: '#FFFFFF',
    black: '#000000',
    divider: '#D9D9D9',
  },
  theme: {
    primary: '#252427',
    secondary: '#58BA47',
    primaryLight: '#373639',
  },
};

export const shadows = {
  scroll: '4px 0px 24px rgb(0, 0, 0, 0.15)',
};

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      scroll: string;
    };
  }
  interface ThemeOptions {
    customShadows?: Theme['customShadows'];
  }
}
