import { useState, useContext, useEffect } from 'react';
import { SearchIcon } from '../../../../components/interface/icons/SearchIcon';
import { BrandInput } from '../../../../components/inputs/BrandInput';
import { ColorPicker } from '../../../../components/color-picker/ColorPicker';
import { setBuildBlockPropsByKey } from '../../../../helpers/setBuildBlockPropsByKey';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';

export const ButtonEditor = () => {
  const [search, setSearch] = useState('');
  const {
    setMailEditorState,
    selectedBlockID,
    selectedMailEditorBlock,
    backgroundColor,
    setBackgroundColor,
  } = useContext(MailBuilderContext);

  useEffect(() => {
    setBuildBlockPropsByKey(
      setMailEditorState,
      'style',
      { background: backgroundColor },
      selectedBlockID,
    );
  }, [backgroundColor]);

  useEffect(() => {
    if (!('style' in selectedMailEditorBlock.params)) return;
    setBackgroundColor(selectedMailEditorBlock?.params.style?.background || '#7E9D00');
  }, [selectedMailEditorBlock.id]);

  const handleChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  return (
    <>
      <BrandInput
        leftIcon={<SearchIcon />}
        // rightIcon={<CloseIcon onClick={() => {}} />}
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
        placeholder="Enter url here"
      />
      <ColorPicker value={backgroundColor} onChange={handleChange} />
    </>
  );
};
