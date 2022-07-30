import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormWrapper from '../../layout/FormWrapper';
import InputContainer from '../../input/InputContainer';
import CheckBoxContainer from '../../input/CheckBoxContainer';
import Submit from '../../button/Submit';
// import { useSelector } from "react-redux";

function MenuForm({ defaultValues, onFormSubmit }) {
  const { collectionId } = useParams();
  // const dataModal = useSelector((state) => state.modal);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const parent = useSelector((state) => state.modal);

  const onSubmit = (data) => {
    const formData = new FormData();

    if (defaultValues) {
      formData.append('_method', 'PUT');
    }

    if (defaultValues) {
      formData.append('url_parent_id', data.url_parent_id);
    } else formData.append('url_parent_id', parent.id ? parent.id : 0);

    if (defaultValues) {
      formData.append('parent_id', data.parent_id);
    } else formData.append('parent_id', parent.id ? parent.id : 0);

    formData.append('collection_id', collectionId);

    formData.append('icon', data.icon ? data.icon : '');
    formData.append('name', data.name ? data.name : '');
    // formData.append("slug", data.slug ? data.slug : '');

    formData.append('description', data.description ? data.description : data.name);
    let isDone;
    if (parseInt(data.is_done, 10) === 1) {
      isDone = 'on';
    } else isDone = '';
    formData.append('is_done', isDone);
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
              {/* <InputContainer
                name="slug"
                control={control}
                // defaultValue={defau}
                label="Slug"
              // errors={errors.name}
              /> */}
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
export default MenuForm;
