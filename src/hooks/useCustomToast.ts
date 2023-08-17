import { AlertStatus, useToast } from '@chakra-ui/react';

function useCustomToast () {
  const toast = useToast();

  function showToast (title: string, status: AlertStatus = 'success', description?: string) {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'bottom-right'
    });
  }

  return { showToast };
}

export default useCustomToast
