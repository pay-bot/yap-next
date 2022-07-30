import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({
    name: yup.string().required('name is a required'),
    title: yup.string().required('title is a required'),
    description: yup.string().required('description is a required'),
  })
  .required();

const schema = yupResolver(validation);

export default { schema };
