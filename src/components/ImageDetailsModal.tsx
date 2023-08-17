import useCustomToast from '@/hooks/useCustomToast';
import { Comment, ImageInterface } from '@/types';
import { fetchComments, postComment } from '@/utils/actions';
import { convertToTimeAgo } from '@/utils/utils';
import { AddIcon, ChatIcon } from '@chakra-ui/icons';
import { useBreakpointValue, Box, Divider, Flex, Grid, GridItem, IconButton, Input, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, Tooltip, Spinner, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState, useRef, FormEvent } from 'react';

interface ImageDetailsModalProps {
  image: ImageInterface;
  isOpen: boolean;
  onClose: () => void;
};

function ImageDetailsModal ({ image, isOpen, onClose }: ImageDetailsModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useCustomToast();
  const scrollRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  }

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const comments = await fetchComments(image.id);
      setComments(comments);
    } catch (error) {
      showToast('Something went wrong.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setComments, showToast, image.id]);

  useEffect(() => {
    loadComments();
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      setIsProcessing(true);
      const result = await postComment({
        description: newComment,
        image_id: image.id
      });
      setComments([...comments, result]);
      setIsProcessing(false)
      setNewComment('');
      scrollToBottom();
    } catch (error) {
      showToast('Something went wrong.', 'error');
    } finally {
      setIsProcessing(false);
    }
  }

  const columns = useBreakpointValue({ base: 1, sm: 3, md: 3 });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior='inside' size='6xl'>
      <ModalOverlay />
      <ModalContent className='modal-box' minHeight='750' maxHeight='750' overflow='hidden'>
        <ModalCloseButton zIndex={9} />
        <ModalBody p={0} display='flex'>
          <Grid flex='1' templateColumns={`repeat(${columns}, 1fr)`}>
            <GridItem colSpan={2}>
              <Flex className='modal-img' height='100%' width='100%' position='relative'>
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  objectFit='contain'
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Box className='comments-box' maxHeight='750' pt={2.5} pb={4} position='relative' borderLeft='1px' borderColor='gray.200' height='100%' display='flex' flexDirection='column'>
                <Text px={4} fontSize='xl' fontWeight={700}>
                  {image.title}
                </Text>
                <Divider my={2} />
                <Box px={4} overflow='auto' ref={scrollRef}>
                  {
                    isLoading
                      ? <Loading />
                      : (
                        <List pb={2} spacing={3}>
                          {
                            comments.length
                              ? (
                                <>
                                  {comments.map((item) => {
                                    return (
                                      <ListItem wordBreak='break-all' key={item.id}>
                                        <Tooltip label={`${convertToTimeAgo(item.created_at)}`}>
                                          <ListIcon as={ChatIcon} color='green.500' />
                                        </Tooltip>
                                        {item.description}
                                      </ListItem>
                                    )
                                  })
                                  }
                                </>
                              )
                              : <Text fontSize='sm'>No comments posted yet.</Text>
                          }
                        </List>
                      )
                  }
                </Box>
                <Flex px={4} pt={2} mt='auto' flexDirection='column' borderTopWidth={1} borderColor='gray.200'>
                  <Text mb={2} fontWeight={600} fontSize='sm' color='gray.700'>{comments.length} comment{`${comments.length === 1 ? '' : 's'}`}</Text>
                  <Flex alignItems='center' columnGap={2}>
                    <form onSubmit={handleSubmit} className='comment-form'>
                      <Input placeholder='Add a comment...' value={newComment} onChange={handleChange} />
                      <IconButton type='submit' colorScheme='blue' aria-label='Post comment' icon={isProcessing ? <Spinner /> : <AddIcon />} />
                    </form>
                  </Flex>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

function Loading () {
  return (
    <Grid gap={4}>
      {
        new Array(3).fill(0).map((item, i) => {
          return (
            <Skeleton key={i} height='20px' />
          )
        })
      }
    </Grid>
  )
}

export default ImageDetailsModal;
