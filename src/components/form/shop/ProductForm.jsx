import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { format } from 'date-fns';
// import { schema } from "./validation";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CheckBoxContainer from '../../input/CheckBoxContainer';
import CustomSelect from '../../input/CustomSelect';
import DatePickerField from '../../input/DatePickerField';
import InputContainer from '../../input/InputContainer';
import Submit from '../../button/Submit';
import FormWrapper from '../../layout/FormWrapper';
import SelectListApi from '../../input/SelectListApi';
import { useShopFeaturesData } from '../../../hooks/useShopFeaturesData';
import { useShopCategoriesData } from '../../../hooks/useShopCategoriesData';
import QuillWrapper from '../../input/QuillWrapper';

function ProductForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: schema,
    defaultValues,
  });

  console.log('deva', defaultValues);

  const defValTags = defaultValues?.features?.map((item) => {
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
    // console.log('tt', data.features)
    const tagg = data.features?.map((t) => t.id);
    const isSame = arr?.length === tagg?.length && arr?.every((o, i) => Object.keys(o).length === Object.keys(tagg[i]).length && Object.keys(o).every((k) => o[k] === tagg[i][k]));
    const newData = data;

    let spcFrom;
    if (newData.special_from === defaultValues?.special_from) {
      spcFrom = defaultValues?.special_from;
    } else spcFrom = format(newData.special_from, 'yyyy-MM-dd');

    let spcTo;
    if (newData.special_to === defaultValues?.special_to) {
      spcTo = defaultValues?.special_to;
    } else spcTo = format(newData.special_to, 'yyyy-MM-dd');

    const formData = new FormData();
    if (isSame) {
      arr.forEach((tag) => formData.append('features[]', tag));
    } else data.tags?.forEach((tag) => formData.append('features[]', tag));
    if (defaultValues) {
      formData.append('_method', 'PUT');
    }
    formData.append('content', data.content ? data.content : '');
    formData.append('name', data.name ? data.name : '');
    formData.append('special_to', spcTo ?? format(new Date(), 'yyyy-MM-dd'));
    formData.append('special_amount', data.special_amount ? data.special_amount : '');
    formData.append('action_url', data.action_url ? data.action_url : '');
    formData.append('category_id', data.category_id);
    // formData.append("features[]", data.features)
    formData.append('amount', data.amount ? data.amount : '');
    formData.append('special_from', spcFrom ?? format(new Date(), 'yyyy-MM-dd'));
    let inStock;
    if (parseInt(data.inStock, 10) === 1) {
      inStock = 'on';
    } else inStock = '';
    formData.append('in_stock', inStock);
    onFormSubmit(formData);
  };

  useEffect(() => {
    register('content', { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue('content', editorState);
  };

  const editorContent = watch('content');

  // const {
  //   // isLoading,
  //   data: categories,
  //   isError,
  //   isSuccess,
  //   error,
  //   refetch,
  // } = useArticleCategoriesData();

  const { data: features } = useShopFeaturesData();
  // console.log('tag', defaultValues)

  const options = features?.data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  console.log('dev', defValTags);

  const [valueTab, setValueTab] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  // let namee = defaultValues[0].name
  // const active = new Date().toISOString().subStr(0, 10)

  const { data: categories } = useShopCategoriesData();

  const category = categories?.data?.map((cat) => cat);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel value="1">
                <div className="">
                  <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                    <div className="flex w-full ">
                      <div className="w-4/12">Category</div>
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
                            defaultValue={fill[0]?.category_id}
                            // error={!!errors.age}
                            // helperText={errors.age?.message}
                          />
                        </div>
                        <div className="relative  w-full  ">
                          <Controller
                            name="features"
                            control={control}
                            // defaultValue={defValTagsUp}
                            {...register('features')}
                            render={({ field: { onChange } }) => (
                              <CustomSelect
                                options={options}
                                placeholder="Feature"
                                // getOptionLabel={features => features?.data[0].name}
                                // getOptionValue={features => features?.data[0].name}
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
                </div>
                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full ">
                    <div className="w-4/12">Article Detail</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="name"
                        control={control}
                        // defaultValue={defau}
                        label="Name"
                        errors={errors.name}
                      />
                      <InputContainer
                        name="amount"
                        control={control}
                        // defaultValue={defau}
                        label="amount"
                        // errors={errors.name}
                      />

                      <DatePickerField
                        sx={{ marginBottom: '20px' }}
                        control={control}
                        name="special_from"
                        label="Special from"
                        error={!!errors.datePicker}
                        helperText={errors.datePicker?.message}
                        size="small"
                        fullWidth
                      />

                      <DatePickerField
                        sx={{ marginBottom: '20px' }}
                        control={control}
                        name="special_to"
                        label="Special to"
                        error={!!errors.datePicker}
                        helperText={errors.datePicker?.message}
                        size="small"
                        fullWidth
                      />
                      <InputContainer
                        name="special_amount"
                        control={control}
                        // defaultValue={defau}
                        label="Special Amount"
                        errors={errors.name}
                      />

                      <div className="">
                        <CheckBoxContainer
                          name="in_stock"
                          control={control}
                          defaultValue={defaultValues?.allow_comment === 1 ? 'on' : ''}
                          label="In stock?"
                          errors={errors.acceptTerms}
                        />
                      </div>
                    </div>
                  </div>
                </Box>

                <div className="flex gap-x-4 mt-6" />

                <div className="flex gap-x-4" />

                <Box sx={{ border: 1, borderColor: 'divider', padding: 2, margin: 2, borderRadius: 1 }}>
                  <div className="flex w-full pb-5">
                    <div className="w-4/12">Article Description</div>
                    <div className="w-8/12">
                      <div className="relative my-6 w-full ">
                        <QuillWrapper
                          value={defaultValues?.content ? editorContent || defaultValues?.content?.content : editorContent || ''}
                          // value={editorContent}
                          onChange={onEditorStateChange}
                        />
                      </div>{' '}
                    </div>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="2">2</TabPanel>

              <Submit />
            </form>
          </TabContext>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default ProductForm;
