import { useDispatch } from 'react-redux';

export default function dispatcher() {
  const dispatch = useDispatch();

  return dispatch;
}
