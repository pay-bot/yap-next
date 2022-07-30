import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import InputContainer from '../../input/InputContainer';
import FormWrapper from '../../layout/FormWrapper';
// import { schema } from "./validation";
import Submit from '../../button/Submit';
import FileContatiner from '../../input/FileContatiner';

function CategoryForm({ defaultValues, onFormSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: schema,

    defaultValues,
  });

  console.log('sect', errors);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }

    if (data.photo) {
      formData.append('photo', data.photo[0]);
    }
    formData.append('name', data.name ? data.name : '');
    formData.append('name_in', data.name_in ? data.name_in : '');
    onFormSubmit(formData);
  });

  return (
    <FormWrapper>
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <form onSubmit={onSubmit}>
            <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
              <div className="flex w-full ">
                <div className="w-4/12">Category Detail</div>
                <div className="w-8/12 space-y-5">
                  <InputContainer
                    name="name"
                    control={control}
                    // defaultValue={defau}
                    label="Name"
                    errors={errors.name}
                  />

                  <InputContainer
                    name="description"
                    control={control}
                    // defaultValue={defau}
                    label="Description"
                  />
                </div>
              </div>
            </Box>

            <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
              <div className="flex w-full items-center ">
                <div className="w-4/12">
                  <div>Media</div>
                </div>
                <div className="w-8/12 mt-6">
                  <FileContatiner name="photo" label="Media" errors={errors.photo} control={control} />

                  <div className="mt-6 w-full">
                    {defaultValues?.image && <img src={`http://127.0.0.1:8000/uploads/images/${defaultValues?.image}`} alt="" className=" w-full object-cover" />}
                  </div>
                </div>
              </div>
            </Box>

            <Submit />
          </form>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default CategoryForm;
