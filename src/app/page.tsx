import ImageGrid from '@/components/ImageGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Take Home Assignment'
};

export default async function Home () {
  
  return (
    <main>
      <ImageGrid  />
    </main>
  );
}
