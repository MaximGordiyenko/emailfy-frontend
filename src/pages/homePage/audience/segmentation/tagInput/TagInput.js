import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import './style.scss';

export const Tags = () => {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder={selected.length >= 1 ? '' : 'Start typing to add a custom tag'}
      />
    </>
  );
};
