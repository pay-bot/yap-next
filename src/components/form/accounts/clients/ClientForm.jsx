import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import FormWrapper from '../../../layout/FormWrapper';
import Submit from '../../../button/Submit';
import InputContainer from '../../../input/InputContainer';
import CustomSelect from '../../../input/CustomSelect';
import { useRolesData } from '../../../../hooks/useRolesData';

// import { schema } from "./validation";

function ClientForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: schema,
    defaultValues,
  });

  console.log('deva', defaultValues);

  const defValTags = defaultValues?.roles?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const defValTagsUp = defValTags?.map((item) => {
    return {
      // label: item.label,
      value: item.value,
    };
  });

  const fill = useSelector((state) => state.artCollection.isFill);
  console.log('filloo', fill);

  const arr = defValTagsUp?.map((t) => t.value);

  const onSubmit = (data) => {
    // console.log('tt', data.roles)
    const tagg = data.roles?.map((role) => role.id);
    const isSame = arr?.length === tagg?.length && arr?.every((o, i) => Object.keys(o).length === Object.keys(tagg[i]).length && Object.keys(o).every((k) => o[k] === tagg[i][k]));

    const formData = new FormData();
    if (isSame) {
      arr.forEach((tag) => formData.append('roles[]', tag));
    } else data.roles?.forEach((tag) => formData.append('roles[]', tag));
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('firstname', data.firstname ? data.firstname : '');

    formData.append('lastname', data.lastname ? data.lastname : '');
    formData.append('cellphone', data.cellphone ? data.cellphone : '');
    formData.append('email', data.email ? data.email : '');

    formData.append('password', data.password ? data.password : '');
    formData.append('password_confirmation', data.password_confirmation ? data.password_confirmation : '');

    onFormSubmit(formData);
  };

  const { data: roles } = useRolesData();
  // console.log('tag', defaultValues)

  const options = roles?.data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  console.log('dev', defValTags);

  return (
    <FormWrapper>
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
              <div className="flex w-full ">
                <div className="w-4/12">Article Detail</div>
                <div className="w-8/12 space-y-5">
                  <InputContainer
                    name="firstname"
                    control={control}
                    // defaultValue={defau}
                    label="First Name"
                    errors={errors.name}
                  />
                  <InputContainer
                    name="lastname"
                    control={control}
                    // defaultValue={defau}
                    label="Last Name"
                    errors={errors.name}
                  />
                  <InputContainer
                    name="cellphone"
                    control={control}
                    // defaultValue={defau}
                    label="Phone"
                    // errors={errors.name}
                  />

                  <InputContainer
                    name="email"
                    control={control}
                    // defaultValue={defau}
                    label="Email"
                    errors={errors.name}
                  />
                  <InputContainer
                    name="password"
                    control={control}
                    // defaultValue={defau}
                    label="Password"
                    // errors={errors.name}
                  />
                  <InputContainer
                    name="password_confirmation"
                    control={control}
                    // defaultValue={defau}
                    label="Password Confirmation"
                    errors={errors.name}
                  />
                </div>
              </div>
            </Box>

            <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
              <div className="flex w-full ">
                <div className="w-4/12">Category</div>
                <div className="w-8/12">
                  <div className="relative  w-full  ">
                    <Controller
                      name="roles"
                      control={control}
                      // defaultValue={defValTagsUp}
                      {...register('roles')}
                      render={({ field: { onChange } }) => (
                        <CustomSelect
                          options={options}
                          placeholder="Roles"
                          // getOptionLabel={roles => roles?.data[0].name}
                          // getOptionValue={roles => roles?.data[0].name}
                          defaultValue={defValTags}
                          isMulti
                          onChange={(v) => onChange(v?.map((val) => val.value))}
                        />
                      )}
                    />
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

export default ClientForm;
