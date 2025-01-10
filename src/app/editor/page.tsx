import Editor from '@/components/ui/editor';


export default function MyComponent() {
  
const content = `
some trash inside
`
  return (
    <Editor content={content} />
  )
}
