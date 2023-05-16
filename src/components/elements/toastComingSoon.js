import { useToast } from '@chakra-ui/react';

export const useToastComingSoon = () => {
  const toast = useToast();

  function displayMessage() {
    toast({
      title: 'Coming Soon!',
      description: 'This feature is still being worked on.',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-left',
    });
  }

  return { displayMessage };
};
