import React from 'react';
import { useForm } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputContainer from '../../input/InputContainer';
import FormWrapper from '../../layout/FormWrapper';
import Submit from '../../button/Submit';
import schema from './validation';
import CheckBoxContainer from '../../input/CheckBoxContainer';

function PageForm({ defaultValues, onFormSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: schema,
    defaultValues,
  });

  console.log('def', defaultValues);
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('icon', data.icon ? data.icon : '');
    formData.append('name', data.name ? data.name : '');
    // formData.append("slug", data.slug ? data.slug : '');
    formData.append('title', data.title);
    formData.append('description', data.description);

    let allowComment;
    if (parseInt(data.allow_comments, 10) === 1) {
      allowComment = 'on';
    } else allowComment = '';
    formData.append('allow_comments', allowComment);
    let isHeader;
    if (parseInt(data.is_header, 10) === 1) {
      isHeader = 'on';
    } else allowComment = '';
    formData.append('is_header', isHeader);

    // formData.append("heading_element", data.heading_element);

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
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Page Detail</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="icon"
                        control={control}
                        // defaultValue={defau}
                        label="Icon"
                        // errors={errors.name}
                      />

                      <InputContainer
                        name="name"
                        control={control}
                        // defaultValue={defau}
                        label="Name"
                        errors={errors.name}
                      />

                      {/* <InputContainer
                          name="slug"
                          control={control}
                          // defaultValue={defau}
                          label="Slug"
                        // errors={errors.name}
                        /> */}
                      <div className="flex">
                        <div className="">
                          <CheckBoxContainer
                            name="is_header"
                            control={control}
                            defaultValue={defaultValues?.allow_comment === 1 ? 'on' : ''}
                            label="Is Header?"
                            errors={errors.acceptTerms}
                          />
                        </div>

                        {/* <div className="">
                      <input
                        type="checkbox"
                        id="is_header"
                        name="is_header"
                        value="on"
                        // selected={defaultValues?.allow_coments}
                        className=""
                        // required
                        {...register("is_header")}
                      />
                      <label className="" htmlFor="is_header">
                        Is Header
                      </label>
                    </div> */}
                        {/* <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="on"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="1"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="on"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div> */}

                        <div className="">
                          <CheckBoxContainer
                            name="allow_comments"
                            control={control}
                            defaultValue={defaultValues?.allow_comment === 1 ? 'on' : ''}
                            label="Allow Comments?"
                            errors={errors.acceptTerms}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Meta Detail</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="title"
                        control={control}
                        // defaultValue={defau}
                        label="Meta title"
                        errors={errors.title}
                      />

                      <InputContainer
                        name="description"
                        control={control}
                        // defaultValue={defau}
                        label="Meta description"
                        errors={errors.description}
                      />
                    </div>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Page Detail</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="name_in"
                        control={control}
                        // defaultValue={defau}
                        label="Name"
                        errors={errors.name}
                      />

                      <InputContainer
                        name="title_in"
                        control={control}
                        // defaultValue={defau}
                        label="Meta title"
                        errors={errors.name}
                      />
                      <InputContainer
                        name="description_in"
                        control={control}
                        // defaultValue={defau}
                        label="Meta description"
                        errors={errors.name}
                      />
                    </div>
                  </div>
                </Box>
              </TabPanel>
              <Submit />
            </form>
          </TabContext>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default PageForm;
