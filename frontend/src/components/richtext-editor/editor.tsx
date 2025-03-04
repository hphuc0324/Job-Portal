import { useEditor, EditorContent } from '@tiptap/react';
import extensions from '@/constants/tiptap-extensions';
import { cn } from '@/lib/utils';
import EditorBar from './editor-bar';

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

function Editor({ value, onChange, editable = false }: EditorProps) {
  const editor = useEditor({
    editable: editable,
    content: JSON.parse(value),
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange && onChange(JSON.stringify(json));
    },
    editorProps: {
      attributes: {
        class: cn('h-full outline-none'),
      },
    },
    extensions: extensions,
  });

  return (
    <div className={cn('max-w-full', editable && 'p-3 border-solid border-[1px] border-black rounded-md min-h-20')}>
      {editor && editable && <EditorBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
