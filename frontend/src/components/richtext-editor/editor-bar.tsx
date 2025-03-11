import { Editor } from '@tiptap/react';
import { Button } from '../ui/button';
import {
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorBarProps {
  editor: Editor;
}

interface MenuButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

function MenuButton({ active, onClick, children, disabled = false }: MenuButtonProps) {
  return (
    <Button type='button' disabled={disabled} onClick={onClick} variant="outline" className={cn('w-8 h-8', active && '!bg-gray-200')}>
      {children}
    </Button>
  );
}

function EditorBar({ editor }: EditorBarProps) {
  return (
    <div className="w-full flex gap-3 mb-4 flex-wrap">
      <div className="flex gap-1">
        <MenuButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </MenuButton>
        <MenuButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </MenuButton>
        <MenuButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </MenuButton>
        <MenuButton
          active={editor.isActive('heading', { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          H4
        </MenuButton>
        <MenuButton
          active={editor.isActive('heading', { level: 5 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          H5
        </MenuButton>
        <MenuButton
          active={editor.isActive('heading', { level: 6 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          H6
        </MenuButton>
      </div>

      <div className="flex gap-1">
        <MenuButton
          active={editor.isActive('bold')}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </MenuButton>
        <MenuButton
          active={editor.isActive('italic')}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </MenuButton>
        <MenuButton
          active={editor.isActive('underline')}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline />
        </MenuButton>
      </div>

      <div className="flex gap-1">
        <MenuButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft />
        </MenuButton>
        <MenuButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <AlignJustify />
        </MenuButton>
        <MenuButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter />
        </MenuButton>
        <MenuButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight />
        </MenuButton>
      </div>

      <div className="flex gap-1">
        <MenuButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </MenuButton>
        <MenuButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </MenuButton>
      </div>
    </div>
  );
}

export default EditorBar;
