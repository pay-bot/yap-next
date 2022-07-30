import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import FormWrapper from '../../layout/FormWrapper';
import InputContainer from '../../input/InputContainer';
import CheckBoxContainer from '../../input/CheckBoxContainer';
import Submit from '../../button/Submit';

function ChildMenuForm({ defaultValues, onFormSubmit, isLoading }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const validationSchema = {
    name: { required: 'First Name is required' },
    icon: { required: 'Last Name is required' },
    description: { required: 'Last Name is required' },
    roles: { required: 'Please select' },
  };

  const onSubmit = (data, e) => {
    const formData = new FormData();

    defaultValues && formData.append('_method', 'PUT');
    formData.append('icon', data.icon ? data.icon : '');
    formData.append('name', data.name ? data.name : '');
    formData.append('slug', data.slug ? data.slug : '');
    formData.append('url_parent_id', data.url_parent_id ? data.url_parent_id : 0);
    formData.append('parent_id', data.parent_id ? data.parent_id : 0);

    formData.append('description', data.description ? data.description : '');
    formData.append('is_done', data.is_done ? (data.is_done & (data.is_done == 1) ? 'on' : data.is_done) : '');
    onFormSubmit(formData);
  };

  console.log('de', defaultValues);
  return (
    <FormWrapper>
      {/* {console.log("control", control._getWatch)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
          <div className="flex  w-full ">
            <div className="w-4/12">Category</div>
            <div className="w-8/12 space-y-4">
              <InputContainer
                name="icon"
                control={control}
                // defaultValue={defau}
                label="Icon"
                errors={errors.name}
              />
              <InputContainer
                name="name"
                control={control}
                // defaultValue={defau}
                label="Name"
                // errors={errors.name}
              />
              <InputContainer
                name="slug"
                control={control}
                // defaultValue={defau}
                label="Slug"
                // errors={errors.name}
              />
              <InputContainer
                name="description"
                control={control}
                // defaultValue={defau}
                label="Description"
                // errors={errors.name}
              />
              <CheckBoxContainer name="is_done" control={control} defaultValue={defaultValues?.is_done === 1 ? 'on' : ''} label="Is Done?" errors={errors.acceptTerms} />
              <Submit />
            </div>
          </div>
        </Box>
      </form>
    </FormWrapper>
  );
}
export default ChildMenuForm;
