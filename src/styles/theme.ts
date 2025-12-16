// Tema oficial do DKS Festival 25
export const colors = {
  black: '#2C2825',
  blue: '#61B8DE',
  white: '#FFFFFF',
  darkGray: '#1a1816',
  lightGray: '#4a4642',
  blueLight: '#8acbe8',
  blueDark: '#4a9bc4'
};

export const theme = {
  primary: {
    600: colors.blue,
    900: colors.black
  },
  grey: {
    300: colors.lightGray
  },
  white: colors.white,
  green: {
    300: colors.blue
  },
  loader: {
    t498: colors.blue,
    t498O: colors.blueDark,
    id498: '#8acbe8',
    idata498: colors.blue
  },
  scrollbar: {
    border: colors.black,
    thumb: {
      bg: colors.blue
    }
  },
  gradient: {
    blue: {
      300: colors.blue,
      600: colors.blueDark,
      900: colors.black
    }
  },
  text: {
    grey: {
      300: colors.lightGray,
      500: colors.white
    }
  },
  timeline: {
    divider: {
      bg: colors.blue
    }
  }
};

// Estilos CSS globais para o Planby
export const planbyStyles = `
  .planby {
    --planby-primary-600: ${colors.blue};
    --planby-primary-900: ${colors.black};
    --planby-grey-300: ${colors.lightGray};
    --planby-white: ${colors.white};
    background: ${colors.black};
  }
`;

