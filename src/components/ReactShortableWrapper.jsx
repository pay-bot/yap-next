import { ReactSortable } from 'react-sortablejs';
import { useDispatch } from 'react-redux';
import { onMoveStart } from '../features/shortableSlice';

export default function ReactShortableWrapper({ list, setList, onEnd, children, className }) {
  const dispatch = useDispatch();
  return (
    list && (
      <ReactSortable swap list={list} setList={setList} onStart={() => dispatch(onMoveStart())} onEnd={onEnd} className={className}>
        {children}
      </ReactSortable>
    )
  );
}
