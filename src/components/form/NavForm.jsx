import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Submit from '../button/Submit';
import CustomSelect from '../input/CustomSelect';
import FormWrapper from '../layout/FormWrapper';
import InputContainer from '../input/InputContainer';
import CheckBoxContainer from '../input/CheckBoxContainer';
import { useRolesData } from '../../hooks/useRolesData';

function NavForm({ defaultValues, onFormSubmit }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const { data: roles } = useRolesData();
  // console.log('tag', defaultValues)

  const options = roles?.data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const defValRoles = defaultValues?.roles?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const defValRolesUp = defValRoles?.map((item) => {
    return {
      // label: item.label,
      value: item.value,
    };
  });

  const arr = defValRolesUp?.map((t) => t.value);
  const onSubmit = (data) => {
    const rolee = data.roles?.map((role) => role.id);
    const isSame =
      arr?.length === rolee?.length && arr?.every((o, i) => Object.keys(o).length === Object.keys(rolee[i]).length && Object.keys(o).every((k) => o[k] === rolee[i][k]));
    console.log(isSame);
    const formData = new FormData();

    if (isSame) {
      arr.forEach((tag) => formData.append('roles[]', tag));
    } else data.roles?.forEach((tag) => formData.append('roles[]', tag));
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('icon', data.icon ? data.icon : '');
    formData.append('name', data.name ? data.name : '');
    formData.append('slug', data.slug ? data.slug : '');

    formData.append('description', data.description ? data.description : '');
    let isDone;
    if (parseInt(data.is_done, 10) === 1) {
      isDone = 'on';
    } else isDone = '';
    formData.append('is_done', isDone);

    // formData.append("heading_element", data.heading_element);
    // const data = data.allow_comments ? data.allow_comments & data.allow_comments == 1 ? 'on' : data.allow_comments : ''
    // const allow = data.allow_comment === true ? 'on' : 0
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
              <div className="relative ">
                <Controller
                  name="roles"
                  control={control}
                  {...register('roles')}
                  render={({ field: { onChange } }) => (
                    <CustomSelect placeholder="Roles" options={options} defaultValue={defValRoles} isMulti onChange={(v) => onChange(v?.map((val) => val.value))} />
                  )}
                />
              </div>
              <CheckBoxContainer name="is_done" control={control} defaultValue={defaultValues?.is_done === 1 ? 'on' : ''} label="Is Done?" errors={errors.acceptTerms} />
              <Submit />
            </div>
          </div>
        </Box>
      </form>
    </FormWrapper>
  );
}
export default NavForm;
