import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from '@/lib/axios';

const ModalAccountSettings = ({ isOpen, onClose }) => {
  const [isResetting, setIsResetting] = useState(false);
  const toast = useToast();
  const { data: session, update } = useSession();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: session?.user?.displayName ?? '',
    },
  });

  const onSubmit = (values) => {
    axios
      .put(`/api/user/settings/${session?.user?.id}`, values)
      .then((response) => {
        if (response.status === 200) {
          update();
          toast({
            title: 'Account Settings Saved',
            status: 'success',
            duration: 1000,
            position: 'top',
            isClosable: true,
          });
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      })
      .catch((error) => {
        Object.entries(error.data.errors).forEach(([k, v]) => {
          setError(k, { type: error.status, message: v });
        });
      });
  };

  const resetDisplayName = () => {
    setIsResetting(true);
    axios
      .put(`/api/user/settings/${session?.user?.id}`, { displayName: null })
      .then(() => {
        toast({
          title: 'Account Settings Saved',
          status: 'success',
          duration: 1000,
          position: 'top',
          isClosable: true,
        });
        setTimeout(() => {
          update();
          onClose();
        }, 1000);
      });
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Account Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="displayName" mb={3} isInvalid={errors?.displayName}>
            <FormLabel>Display Name</FormLabel>
            <Input
              placeholder="Enter display name"
              {...register('displayName', {
                required: true,
                maxLength: { value: 65535, message: 'This name is too long' },
              })}
            />
            <FormErrorMessage>{errors?.displayName?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="red"
            onClick={resetDisplayName}
            isLoading={isResetting}
          >
            Reset Display Name
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAccountSettings;
