import { Box, Heading } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box as='nav' bg='blue.500' color='white' p={4} display='flex' justifyContent='center'>
      <Heading>Take Home Assignment</Heading>
    </Box>
  );
};
