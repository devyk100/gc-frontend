"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { useState } from "react"
import { getSession } from "next-auth/react"
import { getImageUrlFromFile, getImageUrlFromUrl } from "@/utility/image-handlers"

type Image_t = {
  name: string;
  url: string;
}

function PreviewImage({ url, name }: { url: string, name: string }) {
  return (<li className="flex flex-row w-full items-center gap-2 ">
    <img src={url} alt={name} height={35} width={35} />
    <span className="text-sm ">
      {name.slice(0, 40)}....
    </span>
  </li>)
}

export function AddImageDialog({ editor }: {
  editor: any;
}) {
  const [images, setImages] = useState<Image_t[]>([]);
  const [imageSrc, setImageSrc] = useState<string>("");
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

        <div className="grid w-full">
          <div className="items-center gap-2 flex flex-col w-full">
            <Label htmlFor="name" className="text-right">
              Source URL
            </Label>
            <span className="flex w-full items-center justify-center gap-x-1">
              <Input id="src" className="w-[90%]" type="url" placeholder="https://someimage.com/cat.png" defaultValue={imageSrc} onChange={(event) => setImageSrc(event.target.value)} />
              <Button className="text-3xl" onClick={async () => {
                const userData = await getSession()
                const url = await getImageUrlFromUrl(imageSrc, userData!);
                console.log(url, "is the url on the CDN")
                setImages((val) => {
                  console.log("Triggered set images")
                  return [...val, { name: url, url: url }]
                })
              }}>+</Button>
            </span>
          </div>
        </div>

        <span>OR</span>

        <input type="file"
          className="w-full p-2 bg-zinc-900 rounded-lg"
          placeholder=""
          onChange={async (event) => {
            if(!event.target.files) return;
            const files: File[] = Array.from(event.target.files);
            const userData = await getSession()
            const uploadList: Promise<string>[] = []
            files.map(file => {
              if(!file.type.startsWith("image")) return
              uploadList.push(getImageUrlFromFile(file, userData!))
            })
            const imageUrls = await Promise.all(uploadList)
            
            imageUrls.map(val => {
              setImages(images => [...images, {name: val, url: val}])
            })

          }}
          multiple
        />

        {/* preview of the images addeed */}
        {
          images.length > 0 ?
            <>
              <ol className="w-full flex flex-col gap-y-1">
                {images.map((val, index) => <PreviewImage name={val.name} url={val.url} key={val.url + index} />)}
              </ol>
            </> : null
        }

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => {
              images.map((val, index) => {
                setTimeout(() => {
                  editor.chain().focus().setImage({ src: val.url, alt: val.name, title: "" }).run()
                }, 200*index)
              })
              setImages((val) => [])
            }}>Add image(s)</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
