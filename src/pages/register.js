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

const Register = () => {
  const {
    handleSubmit,
    register: formRegister,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '', password: '', password_confirmation: '' },
  });
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    register(data);
  };

  return (
    <Flex
      width="full"
      minHeight="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, green.200, pink.500)"
    >
      <Box
        width="600px"
        border="1px solid #ccc"
        p={4}
        bgColor={useColorModeValue('white', 'gray.700')}
        boxShadow="md"
        rounded="sm"
      >
        <Heading mb={4}>Register</Heading>

        <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <FormControl isInvalid={!!errors?.email} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              {...formRegister('email')}
              data-cy="register-email-input"
            />
            <FormErrorMessage>{errors?.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              {...formRegister('password')}
              data-cy="register-password-input"
            />
            <FormErrorMessage>{errors?.password}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password_confirmation} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="password_confirmation"
              {...formRegister('password_confirmation')}
              data-cy="register-password-confirmation-input"
            />
            <FormErrorMessage>{errors?.password_confirmation}</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            Register
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
