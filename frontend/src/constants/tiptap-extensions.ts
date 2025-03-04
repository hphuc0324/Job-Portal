// import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const extensions = [
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
  BulletList.configure({
    keepAttributes: false,
    keepMarks: true,
  }),
  OrderedList.configure({
    keepAttributes: false,
    keepMarks: true,
  }),
  StarterKit.configure({
    history: false,
    bulletList: false,
    orderedList: false,
  }),
];

export default extensions;
