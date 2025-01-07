"use client"

import { Color } from '@tiptap/extension-color'
import ImageTipTapExtension from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from './button'
import Image from 'next/image'
import EditorButton from './editor-button'

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  
  if (!editor) {
    return null
  }

  const addImage = () => {
    // add complete functionality to check the user and upload the image here itself to the cloud
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: url }).run()
    }
  }
  return (
    <div className="control-group">
      <div className="Button-group">
        <EditorButton onClick={addImage} height={10} width={10} src='/editor/image.svg' imageClassName='w-4'/>
        <EditorButton height={10} src='/editor/bold.svg' width={10}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          isActive={() => editor.isActive('bold')}
        />
        <EditorButton height={10} width={10} src='/editor/italic.svg'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          isActive={() => editor.isActive("italic")}
        />
        <EditorButton height={30} width={30} src='/editor/strikethrough.svg'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          imageClassName='w-4'
          isActive={() => editor.isActive('strike')}
        />
        <EditorButton height={10} src='/editor/code.svg' width={10}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          imageClassName='w-4'
          isActive={() => editor.isActive('code')}
        />
        <EditorButton height={10} src='/editor/paragraph.svg' width={10}
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={() => editor.isActive('paragraph')}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          imageClassName='w-4'
        />
        <EditorButton height={10} src='/editor/h1.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={() => editor.isActive('heading', {level: 1})}
        />
        <EditorButton height={10} src='/editor/h2.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={() => editor.isActive('heading', {level: 2})}
        />
        <EditorButton height={10} src='/editor/h3.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={() => editor.isActive('heading', {level: 3})}
        />
        <EditorButton height={10} src='/editor/h4.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={() => editor.isActive('heading', {level: 4})}
        />
        <EditorButton height={10} src='/editor/h5.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          isActive={() => editor.isActive('heading', {level: 5})}
        />
        <EditorButton height={10} src='/editor/h6.svg' width={10}
          imageClassName='w-4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          isActive={() => editor.isActive('heading', {level: 6})}
        />
        <EditorButton height={10} src='/editor/bullet-list.svg' width={10}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={() => editor.isActive('bulletlist')}
        />
        
        <EditorButton height={10} src='/editor/ordered-list.svg' width={10}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={() => editor.isActive('orderedList')}
        />
        
        <EditorButton height={10} src='/editor/code-block.svg' width={10}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={() => editor.isActive('codeBlock')}
        />
        
        <EditorButton height={10} src='/editor/block-quote.svg' width={10}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={() => editor.isActive('blockquote')}
        />
        
        <EditorButton height={10} src='/editor/horizontal-rule.svg' width={10} onClick={() => editor.chain().focus().setHorizontalRule().run()}/>
        
        {/* <EditorButton height={10} src='/editor/bullet-list.svg' width={10} onClick={() => editor.chain().focus().setHardBreak().run()} /> */}
        
        <EditorButton height={10} src='/editor/undo.svg' width={10}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        />
        <EditorButton height={10} src='/editor/redo.svg' width={10}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        />
        
        <EditorButton height={10} src='/editor/purple.svg' width={10}
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          isActive={() => editor.isActive('textStyle', { color: '#958DF1' })}
        />
        
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //@ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  ImageTipTapExtension.configure({allowBase64: true})
]

const content = `
some trash inside
`

export default () => {
  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
  )
}
