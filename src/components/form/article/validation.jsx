import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({
    category_id: yup.string().required('category ID is a required'),
    name: yup.string().required('password is a required'),
  })
  .required();

const schema = yupResolver(validation);

export { schema };
