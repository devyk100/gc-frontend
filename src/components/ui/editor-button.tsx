import React from "react";
import { Button } from "./button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorButtonProps extends React.ComponentProps<typeof Button> {
    src: string;
    width: number;
    height: number;
    imageClassName?: string;
    isActive?: () => boolean
}

const EditorButton: React.FC<EditorButtonProps> = ({
    src,
    width,
    height,
    imageClassName,
    className,
    isActive,
    ...props
})  => {
    return (<>
        <Button className={cn("bg-transparent dark:border-zinc-700 border-zinc-300 hover:bg-green-400 dark:hover:bg-green-700", className, isActive? (isActive() ? "bg-green-400 dark:bg-green-700":""): "")} {...props}>
            <Image src={src} alt={src} width={width} height={height} className={cn('object-cover w-3 h-3 dark:invert', imageClassName)} />
        </Button>
    </>)
}

export default EditorButton