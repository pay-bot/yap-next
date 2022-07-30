import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup
  .object()
  .shape({
    content_category: yup.string().required('content category is a required'),
    content_title: yup.string().required('content title is a required'),
    // heading_element: yup.string().required('heading element is a required'),
    //   media: yup
    //     .mixed()
    //     .required()

    //   // status: yup.boolean().required(),
  })
  .required();

const schema = yupResolver(validation);

export default { schema };
