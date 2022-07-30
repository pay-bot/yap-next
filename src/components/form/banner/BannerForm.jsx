import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from 'date-fns';
import InputContainer from '../../input/InputContainer';
import DatePickerField from '../../input/DatePickerField';
import CheckBoxContainer from '../../input/CheckBoxContainer';
import FormWrapper from '../../layout/FormWrapper';
import Submit from '../../button/Submit';
import FileContatiner from '../../input/FileContatiner';

function BannerForm({ defaultValues, onFormSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: schema,

    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    const newData = data;
    let actForm;
    if (newData.active_from === defaultValues?.active_from) {
      actForm = defaultValues?.active_from;
    } else actForm = format(newData.active_from, 'yyyy-MM-dd');

    let actTo;
    if (newData.active_to === defaultValues?.active_to) {
      actTo = defaultValues?.active_to;
    } else actTo = format(newData.active_to, 'yyyy-MM-dd');
    if (data.photo) {
      formData.append('photo', data.photo[0]);
    }
    // formData.append("media", data.media ? data.media & data.media == 1 ? 'on' : data.media : '');
    // formData.append("media", defaultValues.media)
    formData.append('name', data.name ? data.name : '');
    formData.append('name_in', data.name_in ? data.name_in : '');
    formData.append('active_to', actTo ?? format(new Date(), 'yyyy-MM-dd'));
    formData.append('action_name', data.action_name ? data.action_name : '');
    formData.append('action_url', data.action_url ? data.action_url : '');
    formData.append('category_id', data.category_id);
    // formData.append("tags[]", data.tags)
    formData.append('description', data.description ? data.description : '');
    formData.append('active_from', actForm ?? format(new Date(), 'yyyy-MM-dd'));
    let allowComment;
    if (parseInt(data.allow_comments, 10) === 1) {
      allowComment = 'on';
    } else allowComment = '';
    formData.append('allow_comments', allowComment);

    onFormSubmit(formData);
  });

  const [valueTab, setValueTab] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <FormWrapper>
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="English" value="1" />
                <Tab label="Indonesia" value="2" />
              </TabList>
            </Box>

            <form onSubmit={onSubmit}>
              <TabPanel value="1">
                <div className="w-full space-y-5">
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

                  <DatePickerField
                    sx={{ marginBottom: '20px' }}
                    control={control}
                    name="active_from"
                    label="Active from"
                    error={!!errors.datePicker}
                    helperText={errors.datePicker?.message}
                    size="small"
                    fullWidth
                  />

                  <DatePickerField
                    sx={{ marginBottom: '20px' }}
                    control={control}
                    name="active_to"
                    label="Active to"
                    error={!!errors.datePicker}
                    helperText={errors.datePicker?.message}
                    size="small"
                    fullWidth
                  />

                  <InputContainer
                    name="action_name"
                    control={control}
                    // defaultValue={defau}
                    label="Action Name"
                  />

                  <InputContainer
                    name="action_url"
                    control={control}
                    // defaultValue={defau}
                    label="Action Url"
                    // errors={errors.name}
                  />

                  <div className="flex">
                    <CheckBoxContainer
                      name="hide_name"
                      control={control}
                      defaultValue={defaultValues?.allow_comment === 1 ? 'on' : ''}
                      label="Hide Name ?"
                      errors={errors.acceptTerms}
                    />
                    {/* <CheckBoxContainer
                            name="is_website"
                            control={control}
                            defaultValue={defaultValues?.allow_comment === 1 ? 'on' : ''}
                            label="Add To"
                            errors={errors.acceptTerms}
                          /> */}
                  </div>
                </div>

                <div className="w-full mt-6">
                  <FileContatiner name="photo" label="Media" errors={errors.photo} control={control} />

                  <div className="mt-6 w-full">
                    {defaultValues?.image && <img src={`http://127.0.0.1:8000/uploads/images/${defaultValues?.image}`} alt="" className=" w-full object-cover" />}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="w-full space-y-5">
                  <InputContainer
                    name="name_in"
                    control={control}
                    // defaultValue={defau}
                    label="Name"
                    errors={errors.name}
                  />
                  <InputContainer
                    name="description_in"
                    control={control}
                    // defaultValue={defau}
                    label="Description"
                  />
                  <InputContainer
                    name="action_name_in"
                    control={control}
                    // defaultValue={defau}
                    label="Action Name"
                  />
                </div>
              </TabPanel>
              <Submit />
            </form>
          </TabContext>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default BannerForm;
