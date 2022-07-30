import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({
    name: yup.string().required('name is a required'),
    lastName: yup.string().required('lastName is a required'),
    'phone Number': yup
      .string()
      .trim()
      .matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/, 'Use only phone number iran (+98 , 0912)'),
    email: yup.string().required('email is a required').email(),
    password: yup.string().required('password is a required').min(8).max(32),
    password_confirmation: yup
      .string()
      .required('password_confirmation is a required')
      .oneOf([yup.ref('password'), null], 'password_confirmation does not match'),
  })
  .required();

const defaultValues = {
  name: '',
  email: '',
  lastName: '',
  password: '',
  'phone Number': '',
  password_confirmation: '',
};
const schema = yupResolver(validation);

export { schema, defaultValues };
