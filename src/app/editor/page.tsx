import Editor from '@/components/ui/editor';
import { prisma } from '@/lib/prisma';


export default async function MyComponent() {

  const content = `
some trash inside
` 
  return (
    <Editor content={content} />
  )
}
