import { Box, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as='footer' bg='gray.200' p={4} display='flex' justifyContent='center'>
      <Text color='gray.500' fontSize='sm'>Copyright &copy; {new Date().getFullYear()}</Text>
    </Box>
  );
};
