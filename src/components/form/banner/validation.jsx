import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({
    name: yup.string().required('password is a required'),
    photo: yup.mixed().required(),

    // status: yup.boolean().required(),
  })
  .required();

const schema = yupResolver(validation);

export { schema };
