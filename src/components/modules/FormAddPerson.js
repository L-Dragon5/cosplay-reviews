import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import axios from '@/lib/axios';

const FormAddPerson = ({ type }) => {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      type: type,
      name: '',
    },
  });

  const onSubmit = (values) => {
    const newValues = { ...values, submitterId: session?.user?.id };
    if (values?.socialInstagram) {
      newValues.socialInstagram = values.socialInstagram.replace('@', '');
    }
    if (values?.socialFacebook) {
      newValues.socialFacebook = values.socialFacebook.replace('@', '');
    }
    if (values?.socialTwitter) {
      newValues.socialTwitter = values.socialTwitter.replace('@', '');
    }

    axios.post('/api/person', newValues);
  };

  // Load loader and
  if (isSubmitting) {
    return (
      <Center as={Stack} spacing={10} my={4}>
        <Text fontSize="2xl">Submitting your add request...</Text>
        <Spinner thickness={2} size="xl" />
      </Center>
    );
  } else if (isSubmitSuccessful) {
    return (
      <Center my={4}>
        <Stack textAlign="center">
          <Text fontSize="2xl">Your add request has been submitted!</Text>
          <Text fontSize="lg">
            Our moderation team will process it shortly.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="name" mb={3} isInvalid={errors?.name} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter person's name"
          {...register('name', {
            required: true,
            maxLength: { value: 65535, message: 'This name is too long' },
          })}
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>

      <Stack direction="row" spacing={4} mb={5}>
        <FormControl id="socialInstagram" isInvalid={errors?.socialInstagram}>
          <FormLabel>Instagram Handle</FormLabel>
          <Input
            placeholder="@..."
            {...register('socialInstagram', {
              maxLength: {
                value: 255,
                message: 'This account name is too long ',
              },
            })}
          />
          <FormErrorMessage>
            {errors?.socialInstagram?.message}
          </FormErrorMessage>
          <FormHelperText>If applicable (The @ is optional)</FormHelperText>
        </FormControl>

        <FormControl id="socialFacebook" isInvalid={errors?.socialFacebook}>
          <FormLabel>Facebook Handle</FormLabel>
          <Input
            placeholder="@..."
            {...register('socialFacebook', {
              maxLength: {
                value: 255,
                message: 'This account name is too long ',
              },
            })}
          />
          <FormErrorMessage>{errors?.socialFacebook?.message}</FormErrorMessage>
          <FormHelperText>If applicable (The @ is optional)</FormHelperText>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={4} mb={3}>
        <FormControl id="socialTwitter" isInvalid={errors?.socialTwitter}>
          <FormLabel>Twitter Handle</FormLabel>
          <Input
            placeholder="@..."
            {...register('socialTwitter', {
              maxLength: {
                value: 255,
                message: 'This account name is too long ',
              },
            })}
          />
          <FormErrorMessage>{errors?.socialTwitter?.message}</FormErrorMessage>
          <FormHelperText>If applicable (The @ is optional)</FormHelperText>
        </FormControl>

        <FormControl id="socialWebsite" isInvalid={errors?.socialWebsite}>
          <FormLabel>Website</FormLabel>
          <Input
            type="url"
            placeholder="https://..."
            pattern="https://.*"
            {...register('socialWebsite', {
              maxLength: {
                value: 255,
                message: 'This url is too long ',
              },
            })}
          />
          <FormErrorMessage>{errors?.socialWebsite?.message}</FormErrorMessage>
          <FormHelperText>If applicable</FormHelperText>
        </FormControl>
      </Stack>

      <Button type="submit" colorScheme="green" my={3} isLoading={isSubmitting}>
        Submit
      </Button>
    </Box>
  );
};

export default FormAddPerson;
