
export async function fetchComments (imageId: number) {
  try {
    const res = await fetch(`/api/images/${imageId}/comments`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
}

export async function fetchImages () {
  try {
    const res = await fetch('/api/images');
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
}

interface CommentData {
  image_id: number;
  description: string;
}

export async function postComment (data: CommentData) {
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
}

interface ImageData {
  url: string;
  title: string;
};

export async function postImage (data: ImageData) {
  try {
    const response = await fetch('/api/images', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
}

export async function uploadImage (selectedFile: File) {
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('upload_preset', process.env.CLOUDINARY_PRESET || 'oxbfth5c');

  const response = await fetch(
    `${process.env.CLOUDINARY_URL || 'https://api.cloudinary.com/v1_1/dge7uryz0'}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const { url } = await response.json();
  return url;
}
