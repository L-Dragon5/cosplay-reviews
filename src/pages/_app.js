import '@fontsource/manrope';
import '@fontsource/raleway';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { SessionProvider } from 'next-auth/react';

const newTheme = {
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        color: mode('black', 'gray.200')(props),
        bg: mode('gray.50', 'gray.900')(props),
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
            backgroundColor: 'purple.600',
            textDecoration: 'none',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
          },
          _hover: {
            backgroundColor: 'purple.700',
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
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </ChakraProvider>
  );
}
