import { ReactSortable } from 'react-sortablejs';
import { layoutBlocksInitialState } from '../../initial.constants';
import '../styles.css';

export const LayoutBlocksList = () => {
  const onDragSplitter = (e) => e.target.classList.add('on-drag-splitter');
  return (
    <ReactSortable
      list={layoutBlocksInitialState}
      setList={() => {}}
      group={{
        name: 'layout-list',
        pull: 'clone',
        put: [],
      }}
      sort={false}
      animation={200}
      className="blocks-container">
      {layoutBlocksInitialState.map((item, idx) => {
        const Component = item.icon;
        return (
          <div key={`${item.id}-${idx}`} className="layout-blocks-item" onDrag={onDragSplitter}>
            <Component />
          </div>
        );
      })}
    </ReactSortable>
  );
};
