import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputContainer from '../../input/InputContainer';
import Submit from '../../button/Submit';
import SelectList from '../../input/SelectList';
import Delete from '../../button/Delete';
import FileContatiner from '../../input/FileContatiner';
import schema from './validation';
import { useArticleCategoriesData } from '../../../hooks/useArticleCategoriesData';
import SelectListApi from '../../input/SelectListApi';
import QuillWrapper from '../../input/QuillWrapper';

function ContentForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: schema,

    defaultValues,
  });

  console.log('med', defaultValues);

  const { pageId, sectionId, contentId } = useParams();

  useEffect(() => {
    register('content', { required: true, minLength: 11 });
    register('content_in', { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue('content', editorState);
    setValue('content_in', editorState);
  };

  const editorContent = watch('content');
  const editorContent_in = watch('content_in');
  // const fill =

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('media', data.media ? data.media[0] : '');
    formData.append('content_category', data.content_category);
    formData.append('category_id', data.category_id);
    formData.append('content_title', data.content_title ? data.content_title : '');
    formData.append('heading', data.heading ? data.heading : '');
    formData.append('heading_in', data.heading_in ? data.heading_in : '');
    formData.append('media_align', data.media_align);
    formData.append('caption', data.caption ? data.caption : '');
    formData.append('caption_in', data.caption_in ? data.caption_in : '');
    formData.append('content', data.content ? data.content : '');
    formData.append('content_in', data.content_in ? data.content_in : '');
    formData.append('action_name', data.action_name ? data.action_name : '');
    formData.append('action_name_in', data.action_name_in ? data.action_name_in : '');
    formData.append('action_url', data.action_url ? data.action_url : '');

    formData.append('heading_element', data.heading_element);

    onFormSubmit(formData);
  });

  const removeMedia = async () => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${sectionId}/content/${contentId}/removeMedia`, {})
      .then(() => console.log(true))
      .catch((err) => err.message);
  };

  const queryClient = useQueryClient();
  const { mutateAsync: deleteMedia } = useMutation(removeMedia, {
    onSuccess: () => {
      queryClient.invalidateQueries('sectionsContent');
    },
  });
  const removeMedias = async () => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMedia();
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const [valueTab, setValueTab] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const categoryContent = [
    {
      id: 1,
      value: 'Content',
    },
    {
      id: 2,
      value: 'Article',
    },
    {
      id: 3,
      value: 'Text',
    },
    {
      id: 4,
      value: 'Media',
    },
  ];
  const {
    // isLoading,
    data: categories,
  } = useArticleCategoriesData();
  const category = categories?.data?.map((cat) => cat);

  return (
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
              <div className="">
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Basic information</div>
                    <div className="w-8/12">
                      <div className="w-full">
                        <SelectList
                          control={control}
                          name="content_category"
                          label="Content Category"
                          fullWidth
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          options={categoryContent}
                          error={errors.content_category}
                          // helperText={errors.age?.message}
                        />
                      </div>
                      <div className="w-full">
                        <InputContainer
                          name="content_title"
                          control={control}
                          // defaultValue={defau}
                          label="Content Title"
                          errors={errors.content_title}
                        />
                      </div>
                    </div>
                  </div>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Article Collection</div>
                    <div className="w-8/12">
                      <div className="w-full">
                        <SelectListApi
                          control={control}
                          name="category_id"
                          label="Category"
                          fullWidth
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          options={category}
                          // error={!!errors.age}
                          // helperText={errors.age?.message}
                        />
                      </div>
                    </div>
                  </div>
                </Box>
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Content Detail</div>
                    <div className="w-8/12">
                      <div className="space-y-4">
                        <InputContainer
                          name="heading"
                          control={control}
                          // defaultValue={defau}
                          label="Heading"
                          errors={errors.name}
                        />
                        <SelectList
                          va
                          control={control}
                          name="heading_element"
                          label="Heading Element"
                          fullWidth
                          sx={{ marginBottom: '20px' }}
                          error={errors.heading_element}
                          size="small"
                          options={[{ value: 'H1' }, { value: 'H3' }, { value: 'H6' }]}
                          // error={!!errors.age}
                          // helperText={errors.age?.message}
                        />
                        <InputContainer
                          name="action_name"
                          control={control}
                          // defaultValue={defau}
                          label="Action Name"
                          errors={errors.name}
                        />
                        <InputContainer
                          name="action_url"
                          control={control}
                          // defaultValue={defau}
                          label="Action Url"
                          errors={errors.name}
                        />
                        <InputContainer
                          name="caption"
                          control={control}
                          // defaultValue={defau}
                          label="Caption"
                          errors={errors.name}
                        />
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-6/12" />
                <div className="w-6/12" />
              </div>
              <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                <div className="flex w-full ">
                  <div className="w-4/12">Media Detail</div>
                  <div className="w-8/12">
                    <div className="w-full">
                      <div className="w-full mb-5">
                        <FileContatiner name="media" label="Media" errors={errors.photo} control={control} />
                      </div>
                      <div className="w-full">
                        <SelectList
                          control={control}
                          name="media_align"
                          label="Media Align"
                          fullWidth
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          options={[{ value: 'Left' }, { value: 'Right' }, { value: 'Center' }]}
                          // error={!!errors.age}
                          // helperText={errors.age?.message}
                        />
                      </div>
                    </div>
                    <div className=" w-full">
                      {defaultValues?.media && (
                        <div className="  border">
                          <button type="button" onClick={removeMedias} className="flex w-full justify-end bg-gray-300 p-1">
                            <Delete variant="bordered" />
                          </button>
                          <img src={`https://yap-admin.herokuapp.com/uploads/images/${defaultValues?.media}`} alt="" className="w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Box>
              <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                <div className="flex w-full pb-5">
                  <div className="w-4/12">Content Description</div>
                  <div className="w-8/12">
                    <div className="relative my-6 w-full ">
                      <QuillWrapper value={defaultValues?.content ? editorContent || defaultValues?.content?.content : editorContent || ''} onChange={onEditorStateChange} />

                      <span className="absolute top-0 left-4 -mt-3 rounded-sm bg-black p-1 text-sm text-white">Content</span>
                    </div>{' '}
                  </div>
                </div>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                <div className="flex w-full pb-5">
                  <div className="w-4/12">Article Description</div>
                  <div className="w-8/12 space-y-5">
                    <InputContainer
                      name="heading_in"
                      control={control}
                      // defaultValue={defau}
                      label="Judul"
                      errors={errors.name}
                    />
                    <InputContainer
                      name="caption_in"
                      control={control}
                      // defaultValue={defau}
                      label="Caption"
                      // errors={errors.name}
                    />
                    <InputContainer
                      name="action_name_in"
                      control={control}
                      // defaultValue={defau}
                      label="Nama Aksi"
                      errors={errors.name}
                    />
                    <div className="relative pb-6 w-full ">
                      <QuillWrapper
                        value={defaultValues?.content_in ? editorContent_in || defaultValues?.content_in?.content_in : editorContent_in || ''}
                        onChange={onEditorStateChange}
                      />
                    </div>{' '}
                  </div>
                </div>
              </Box>
            </TabPanel>

            <Submit />
          </form>
        </TabContext>
      </Box>
    </div>
  );
}

export default ContentForm;
