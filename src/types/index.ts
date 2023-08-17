export interface ImageInterface {
  id: number;
  url: string;
  title: string
  created_at: string;
  comments_count: number;
}

export interface Comment {
  id: number;
  description: string;
  image_id: string;
  created_at: string;
}

export interface FormErrors  {
  file: string;
  title: string;
};
