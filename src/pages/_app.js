import '@fontsource/manrope';
import '@fontsource/raleway';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const newTheme = {
  colors: {
    brandPrimary: {
      50: '#def6ff',
      100: '#b7e0f9',
      200: '#8dcaef',
      300: '#62b5e7',
      400: '#399fdf',
      500: '#2086c6',
      600: '#13689b',
      700: '#074a70',
      800: '#002d46',
      900: '#00101d',
    },
    brandAlternative: {
      50: '#e1f3ff',
      100: '#b4d8ff',
      200: '#85bffa',
      300: '#56a5f7',
      400: '#2c8bf2',
      500: '#1872da',
      600: '#0e59aa',
      700: '#053f7a',
      800: '#00264b',
      900: '#000e1d',
    },
    brandSecondary: {
      50: '#ffeaf5',
      100: '#edc8d9',
      200: '#daa5bf',
      300: '#ca82a3',
      400: '#b95f89',
      500: '#a04670',
      600: '#7d3557',
      700: '#5b263e',
      800: '#381526',
      900: '#1a040e',
    },
    brandTertiary: {
      50: '#e0ffe8',
      100: '#b3fdc4',
      200: '#84fa9f',
      300: '#55f979',
      400: '#2bf753',
      500: '#18dd3b',
      600: '#0dac2c',
      700: '#057b1f',
      800: '#004a11',
      900: '#001a00',
    },
    brandGray: {
      50: '#eef2fa',
      100: '#d4d8de',
      200: '#b9bfc5',
      300: '#9da5ae',
      400: '#818b97',
      500: '#67727d',
      600: '#505862',
      700: '#393f46',
      800: '#21262b',
      900: '#040e12',
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('brandGray', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
        lineHight: 'base',
      },
      a: {
        fontFamily: 'heading',
        fontWeight: 400,
      },
    }),
  },
  components: {
    Button: {
      variants: {
        navigation: {
          lineHeight: 'inherit',
          fontWeight: 'normal',
          height: 'auto',
          '&.active': {
            textDecoration: 'none',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
          },
          _hover: {
            textDecoration: 'none',
          },
        },
      },
    },
    Link: {
      variants: {
        'event-navigation': {
          '&.active': {
            backgroundColor: 'brandPrimary.600',
            textDecoration: 'none',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
          },
          _hover: {
            backgroundColor: 'brandPrimary.700',
            textDecoration: 'none',
          },
        },
      },
    },
  },
};

const theme = extendTheme(newTheme);

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
