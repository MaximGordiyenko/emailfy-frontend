import { useState } from 'react';
import { Modifier, EditorState } from 'draft-js';
import './slider.styles.css';

export const LineHeightSlider = ({
  destination,
  setDestination,
  destinationID,
  editorState,
  setEditorState,
  lineHeight,
  setLineHeight,
  selectedData,
}) => {
  const [isThumbActive, setIsThumbActive] = useState(false);

  const convertLineHeightToPercentage = (percentageValue) => {
    const minHeightPercentage = 80;
    const maxHeightPercentage = 200;

    if (percentageValue < minHeightPercentage) {
      return minHeightPercentage;
    } else if (percentageValue > maxHeightPercentage) {
      return maxHeightPercentage;
    } else {
      return percentageValue;
    }
  };

  const handleLineHeightChange = (value) => {
    const newLineHeight = convertLineHeightToPercentage(value);
    setLineHeight(newLineHeight);
    const selection = editorState.getSelection();
    const contentWithLineHeight = Modifier.setBlockData(
      editorState.getCurrentContent(),
      selection,
      { 'line-height': `${newLineHeight}%` },
    );

    const newState = EditorState.push(editorState, contentWithLineHeight, 'change-block-data');
    const newEditorState = EditorState.forceSelection(newState, selection);
    setEditorState(newEditorState);

    if (selectedData) {
      const updatedEditorItems = destination.map((item) =>
        item.id === destinationID ? { ...item, lineHeight: newLineHeight } : item,
      );
      setDestination(updatedEditorItems);
    }
  };

  return (
    <div className="slider-container">
      <div className="label-container">
        <label className="label-item">Line Height</label>
        <label className="label-item">{lineHeight}%</label>
      </div>
      {isThumbActive && (
        <label className="value-label" style={{ left: `${(lineHeight - 80) / 1.28}%` }}>
          {lineHeight}%
        </label>
      )}
      <input
        className="slider"
        type="range"
        min={80}
        max={200}
        step={1}
        value={lineHeight}
        onChange={({ target }) => handleLineHeightChange(parseInt(target.value))}
        onMouseDown={() => setIsThumbActive(true)}
        onMouseUp={() => setIsThumbActive(false)}
      />
    </div>
  );
};
