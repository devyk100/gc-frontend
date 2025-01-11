import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EditorButton from "./editor-button"
import Dropzone from 'shadcn-dropzone';
import { Separator } from "./separator"



const DropZoneComponent = () => {
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => {
        // console.log(acceptedFiles)
        // Do something with the files
      }}
      dropZoneClassName="flex flex-col"
      containerClassName=""
    >
      {(dropzone: any) => {
        return (<>
          <div className="p-2 flex flex-col border-[2px]  border-zinc-900 w-full h-full rounded-lg">

            {
              dropzone.isDragAccept ? (
                <div className='font-medium'>Drop your files here!</div>
              ) : (
                <div className='flex items-center flex-col '>
                  <div className='flex items-center flex-row text-lg font-medium'>
                    Upload files
                  </div>
                  <span className="text-sm">Drag your images here, or click to upload</span>
                </div>
              )
            }
            <div className=' font-medium h-full text-sm'>
              {
                dropzone.acceptedFiles.map((val: any) => {
                  console.log(val)
                  return (<div key={val.path}>{val.path}</div>)
                })
              }
            </div>
          </div>
          {dropzone.acceptedFiles.length} files uploaded so far.
        </>)
      }}
    </Dropzone>
  )
}

export function AddImageDialog({ editor }: {
  editor: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditorButton height={10} width={10} src='/editor/image.svg' imageClassName='' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col">
        <DialogHeader>
          <DialogTitle>Upload images</DialogTitle>
          <DialogDescription>
            Upload your images here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center w-[100%] gap-2 flex flex-col">
            <Label htmlFor="name" className="text-right">
              Source URL
            </Label>
            <Input id="src" className="w-full" />
          </div>
        </div>
        <span>OR</span>
        <DropZoneComponent />
        <DialogFooter>
          <Button type="submit">Add image(s)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
