import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({ name: yup.string().required('name is a required') })
  .required();

const defaultValues = { name: '' };
const schema = yupResolver(validation);

export { schema, defaultValues };
