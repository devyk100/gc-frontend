import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
           value={formik.values.message}
           onChange={onChangeHandler}
           placeholder="Enter the message..........."
      />
  )
}
