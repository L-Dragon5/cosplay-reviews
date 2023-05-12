import {
  Box,
  Container,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';

export default function SmallWithSocial() {
  return (
    <Box bg={useColorModeValue('gray.800', 'gray.700')} color="gray.100">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2023 Cosplay Reviews</Text>
        <Stack direction="row" spacing={6}>
          <IconButton
            rounded="full"
            bg={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
            aria-label="Instagram"
            icon={<FaInstagram />}
            size="lg"
            href="#"
            transition={'background 0.3s ease'}
            _hover={{
              bg: useColorModeValue('whiteAlpha.400', 'whiteAlpha.200'),
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
