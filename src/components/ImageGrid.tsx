'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, Container, Grid, GridItem, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import ImageCard from './ImageCard';
import { ImageInterface } from '@/types';
import FileUpload from './FileUpload';
import { fetchImages } from '@/utils/actions';
import useCustomToast from '@/hooks/useCustomToast';

function ImageGrid () {
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3 });
  const [images, setImages] = useState<ImageInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useCustomToast();

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      showToast('Something went wrong.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setImages, setIsLoading, showToast]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card
        alignItems='center'
        flexDirection='column'
        margin='0 auto'
        marginBottom='50px'
        maxWidth='700px'
        boxShadow='lg' p='6' rounded='md' bg='white'
      >
        <FileUpload loadImages={fetchData} />
      </Card>
      <Container maxW='container.xl'>
        {
          isLoading
            ? <Loading columns={columns} />
            : (
              <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
                {images.map((image) => {
                  return (
                    <GridItem key={image.id} w='100%'>
                      <ImageCard image={image} />
                    </GridItem>
                  )
                })}
              </Grid>
            )
        }
      </Container>
    </>
  )
}

function Loading ({ columns }: { columns?: number }) {
  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
      {
        new Array(6).fill(0).map((item, i) => {
          return (
            <GridItem key={i} w='100%'>
              <Skeleton height='250px'>
              </Skeleton>
            </GridItem>
          )
        })
      }
    </Grid>
  )
};

export default ImageGrid;
