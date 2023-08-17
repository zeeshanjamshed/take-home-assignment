'use client';
import { ImageInterface } from '@/types';
import { ChatIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardFooter, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import ImageDetailsModal from './ImageDetailsModal';

function ImageCard ({ image }: { image: ImageInterface }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {
        isOpen && <ImageDetailsModal image={image} isOpen={isOpen} onClose={onClose} />
      }
      <Card className='img-card' border='1px' borderColor='gray.300' overflow='hidden' maxW='xl' onClick={onOpen} cursor='pointer' boxShadow='xl' rounded='md' bg='white'>
        <CardBody p='0'>
          <Flex position='relative' width='100%' height='250'>
            <Image
              src={image.url}
              alt='Green double couch with wooden legs'
              fill
              objectFit='cover'
            />
          </Flex>
        </CardBody>
        <CardFooter
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          color='white'
          py='2'
          px='4'
          position='absolute'
          left='0'
          bottom='0'
          width='100%'
          opacity='0'
          className='img-card-footer'
        >
          <Text fontSize='lg'>
            {image.title}
          </Text>
          <Text fontSize='sm'>
            <ChatIcon mr='1' />{image.comments_count}
          </Text>
        </CardFooter>
      </Card>
    </>
  )
}

export default ImageCard;
