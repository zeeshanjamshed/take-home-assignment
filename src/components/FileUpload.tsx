import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Input, Text, VStack, Card, Flex, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { uploadImage, postImage } from '@/utils/actions';
import useCustomToast from '@/hooks/useCustomToast';
import { Spinner } from '@chakra-ui/react'
import { FormErrors } from '@/types';
import Image from 'next/image';

interface FileUploadForm {
  title: string;
  file: File | null;
};

const initState = {
  file: null,
  title: ''
};

interface FileUploadProps {
  loadImages: (showLoader: boolean) => void;
};

function FileUpload ({ loadImages }: FileUploadProps) {
  const [formData, setFormData] = useState<FileUploadForm>(initState);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    file: '',
    title: '',
  });
  const { showToast } = useCustomToast();


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;

    if (files) {
      const previewUrl: any = URL.createObjectURL(files[0]);
      setImagePreview(previewUrl);
      setFormData({
        ...formData,
        file: files[0]
      })
    }
    setFormErrors({ ...formErrors, file: '' });

  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value
    })
    setFormErrors({ ...formErrors, title: '' });
  }

  const validateForm = () => {
    const newFormErrors: FormErrors = {
      file: '',
      title: '',
    };
    if (!formData.file) {
      newFormErrors.file = 'Please select a file.';
    }

    if (!formData.title) {
      newFormErrors.title = 'Please enter a title.';
    }
    setFormErrors(newFormErrors);
    return Object.values(newFormErrors).every(value => value === '');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    if (!formData.file) return;
    setIsLoading(true);

    try {
      const url = await uploadImage(formData.file);
      await postImage({
        url: url,
        title: formData.title
      });
      setFormData(initState);
      setImagePreview(null);
      showToast('Image posted successfully.');
      loadImages(false);
    } catch (error) {
      showToast('Something went wrong.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} align='stretch' width='100%'>
      {imagePreview &&
        <Flex position='relative' width='100%' height='230'>
          <Image fill src={imagePreview} alt='Preview' objectFit='contain' />
        </Flex>
      }
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Image Title</FormLabel>
          <Input
            type='text'
            value={formData.title}
            onChange={handleChangeTitle}
            placeholder='Image title...'
          />
          {formErrors.title && <FormHelperText color='red'>{formErrors.title}</FormHelperText>}
        </FormControl>
        <VStack flexDirection='row' alignItems='start' mt={4}>
          <FormControl>
            <Input
              type='file'
              display='none'
              id='fileInput'
              onChange={handleFileChange}
              accept='.png,.jpg,.jpeg'
            />
            <FormLabel htmlFor='fileInput'>
              <Button as='span' leftIcon={<AttachmentIcon />}>
                Choose File
              </Button>
            </FormLabel>
            {formErrors.file && <FormHelperText color='red'>{formErrors.file}</FormHelperText>}
          </FormControl>
          <Button type='submit' colorScheme='blue'>{isLoading ? <Spinner /> : 'Upload'}</Button>
        </VStack>
      </form>
    </VStack>
  )
}
export default FileUpload;
