import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/auth';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    login(data);
  };

  return (
    <Flex
      width="full"
      minHeight="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-l, green.200, pink.500)"
    >
      <Box
        width="600px"
        border="1px solid #ccc"
        p={4}
        bgColor={useColorModeValue('white', 'gray.700')}
        boxShadow="md"
        rounded="sm"
      >
        <Heading mb={4}>Login</Heading>

        <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <FormControl isInvalid={!!errors?.email} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              {...register('email')}
              data-cy="login-email-input"
            />
            <FormErrorMessage>{errors?.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              {...register('password')}
              data-cy="login-password-input"
            />
            <FormErrorMessage>{errors?.password}</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            Login
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
