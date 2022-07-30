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
import Submit from '../../button/Submit';
import InputContainer from '../../input/InputContainer';
import Delete from '../../button/Delete';
import FormWrapper from '../../layout/FormWrapper';
import FileContatiner from '../../input/FileContatiner';
import QuillWrapper from '../../input/QuillWrapper';
import SelectListApi from '../../input/SelectListApi';
import { useCollectionMenusData } from '../../../hooks/useCollectionMenusData';

function SectionForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const { pageId } = useParams();
  // console.log("sect", defaultValues);
  const { data: collection } = useCollectionMenusData();

  const collections = collection?.data?.map((col) => col);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('page_id', pageId);
    formData.append('sectionable_id', pageId);
    formData.append('sectionable_type', 'App\\Models\\Page');
    formData.append('sectionable_type_name', 'Page');
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    if (data.media) {
      formData.append('media', data.media[0]);
    }
    formData.append('name', data.name ? data.name : '');
    formData.append('collection_id', data.collection_id ? data.collection_id : '');
    formData.append('name_in', data.name_in ? data.name_in : '');
    formData.append('content', data.content ? data.content : '');
    formData.append('content_in', data.content_in ? data.content_in : '');
    // console.log(formData)

    onFormSubmit(formData);
  });

  useEffect(() => {
    register('content', { required: false, minLength: 11 });
    register('content_in', { required: false, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue('content', editorState);
  };

  const onEditorStateChangeEn = (editorState) => {
    setValue('content_in', editorState);
  };

  const editorContent = watch('content');
  const editorContentEn = watch('content_in');

  const removeMedia = async () => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${defaultValues.id}/removeMedia`, {})
      .then(() => console.log(true))
      .catch((err) => err.message);
  };

  const queryClient = useQueryClient();
  const { mutateAsync: deleteMedia } = useMutation(removeMedia, {
    onSuccess: () => {
      queryClient.invalidateQueries('sections');
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

  return (
    <FormWrapper>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Indonesia" value="1" />
              <Tab label="English" value="2" />
            </TabList>
          </Box>

          <form onSubmit={onSubmit}>
            <TabPanel value="1">
              <div className="flex w-full gap-x-4">
                <div className="w-full space-y-5">
                  <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                    <div className="flex w-full ">
                      <div className="w-4/12">Category</div>
                      <div className="w-8/12">
                        <InputContainer
                          name="name"
                          control={control}
                          // defaultValue={defau}
                          label="Name"
                          errors={errors.name}
                        />
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
              <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                <div className="flex w-full ">
                  <div className="w-4/12">Category</div>
                  <div className="w-8/12">
                    <div className="w-8/12 mt-6">
                      <FileContatiner name="media" label="Media" errors={errors.media} control={control} />
                    </div>
                    <div className="mt-6 w-6/12">
                      {defaultValues?.media && (
                        <div className="w-40  border">
                          <button type="button" onClick={removeMedias} className="flex w-full justify-end bg-gray-300 p-1">
                            <Delete variant="bordered" />
                          </button>
                          <img src={`http://127.0.0.1:8000/uploads/images/${defaultValues?.media}`} alt="" className="h-36 w-full object-cover" />
                        </div>
                      )}
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
                        name="collection_id"
                        label="Category"
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                        size="small"
                        options={collections}
                        // error={!!errors.age}
                        // helperText={errors.age?.message}
                      />
                    </div>
                  </div>
                </div>
              </Box>
              <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                <div className="flex w-full ">
                  <div className="w-4/12">Category</div>
                  <div className="w-8/12">
                    <div className="relative my-6 w-full">
                      <QuillWrapper value={defaultValues?.content ? editorContent || defaultValues?.content?.content : editorContent || ''} onChange={onEditorStateChange} />

                      <span className="absolute top-0 left-4 -mt-3 rounded-sm bg-black p-1 text-sm text-white">Content</span>
                    </div>
                  </div>
                </div>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex w-full gap-x-4">
                <div className="w-6/12 gap-y-8 space-y-8">
                  <InputContainer
                    name="name_in"
                    control={control}
                    // defaultValue={defau}
                    label="Name"
                    errors={errors.name}
                  />
                </div>
                <div className="w-6/12">
                  {defaultValues?.media && (
                    <div className="">
                      <button type="button" onClick={removeMedias} className="">
                        x
                      </button>
                      <img src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${defaultValues?.media}`} alt="" className="h-1/2 w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex" />
              <div className="w-full">
                <QuillWrapper
                  value={defaultValues?.content_in ? editorContentEn || defaultValues?.content?.content_in : editorContentEn || ''}
                  // value={editorContent}
                  onChange={onEditorStateChangeEn}
                />
              </div>
            </TabPanel>

            <Submit />
          </form>
        </TabContext>
      </Box>
    </FormWrapper>
  );
}

export default SectionForm;
