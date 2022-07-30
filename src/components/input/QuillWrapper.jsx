import ReactQuill from 'react-quill';

export default function QuillWrapper({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      className="h-96"
      value={value}
      // value={editorContent}
      onChange={onChange}
    />
  );
}
