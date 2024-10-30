import { ReactSortable } from 'react-sortablejs';
import { buildingBlocksInitialState } from '../../initial.constants';
import '../styles.css';

export const BuildingBlocksList = () => {
  const onDragSplitter = (e) => e.target.classList.add('on-drag-splitter');

  return (
    <ReactSortable
      list={buildingBlocksInitialState}
      setList={() => {}}
      group={{
        name: 'orthography-list',
        pull: 'clone',
        put: [],
      }}
      sort={false}
      animation={200}
      className="blocks-container">
      {buildingBlocksInitialState.map((item, idx) => {
        const Component = item.icon;
        return (
          <div key={`${item.id}-${idx}`} className={`building-blocks-item`} onDrag={onDragSplitter}>
            <Component />
          </div>
        );
      })}
    </ReactSortable>
  );
};
