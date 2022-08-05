/* eslint-disable */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled, Tabs, Tab, Box, FormControlLabel, FormLabel, FormControl, Radio, RadioGroup, InputBase } from '@mui/material';
import InputContainer from '../../Input/InputContainer';
import { handleModal } from '../../../store/slices/modalSlice';
import { fetchWidgets } from '../../../hooks/useStructureData';
import CustomSelect from '../../Input/CustomSelect';

const validation = yup
  .object()
  .shape({ type: yup.string().required('Team is a required') })
  .required();

const schema = yupResolver(validation);

const StyledTabs = styled((props) => <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />)({
  minHeight: 30,
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: '#6D6E6F',
  },
  '& .MuiTabs-indicatorSpan :hover': { backgroundColor: '#28292B' },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  '& .MuiTabs-indicatorSpan :hover': { backgroundColor: '#28292B' },
  marginRight: 20,
  padding: 0,
  minWidth: 0,
  minHeight: 0,
  color: '#858586',
  '&.Mui-selected': { color: '#28292B' },
  '&.Mui-focusVisible': { backgroundColor: 'rgba(100, 95, 228, 0.32)' },
  '&:hover': {
    color: '#28292B',
    opacity: 1,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className=" py-4 " role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 0 }} className="">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PageForm({ defaultValues, onFormSubmit }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, schema });

  const dispatch = useDispatch();

  const [isDraft, setIsDraft] = React.useState(defaultValues?.is_draft ?? false);
  const [valueUrl, setValueUrl] = React.useState('internal');
  const [valueTab, setValueTab] = useState(0);

  const templateId = useSelector((state) => state.content.activeTemplate);
  const clientId = useSelector((state) => state.client.activeClient);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // const templateId = Cookies.get('bzaTemplate');
  const { data: menuWidget } = useQuery(['widgets', { clientId }], fetchWidgets);

  const handleChangeDraft = (event) => {
    setIsDraft(event.target.value);
  };

  const optionsWidget = menuWidget?.data?.results?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const collectionSelected = defaultValues?.widgets;
  const resultsCollection = optionsWidget?.filter(({ value: id1 }) => collectionSelected?.some(({ id: id2 }) => id2 === id1));
  const arr = resultsCollection?.map((t) => t.value);

  const clientLanguage = useSelector((state) => state.content.activeSiteDetail.languages);
  const modal = useSelector((state) => state.modal);
  const { menuId } = useParams();

  const devLang = [];

  defaultValues?.page_languages?.map((l) => {
    devLang.push(l);
    return devLang;
  });

  const onSubmit = (data) => {
    let parent;
    if (modal.componentName === 'addPage') {
      parent = modal.modalId;
    } else null;

    const widget = data?.widgets?.map((wid) => wid.id);
    const isSame = JSON.stringify(arr) === JSON.stringify(widget);
    let updateCollection;
    if (isSame) {
      updateCollection = arr;
    } else
      data?.widgets?.map((w) => {
        if (w.id && w.id !== null) {
          updateCollection = w.id;
        } else updateCollection = data.widgets;
      });

    // let nameParent
    const page_languages = clientLanguage.reduce((acc, curr) => {
      const inputLang = devLang.find((dl, index) => dl.language === curr.id);
      const output = {};
      output.language = curr.id;
      output.name = data[`name-${curr.id}`] || inputLang?.name || null;
      output.title = data[`title-${curr.id}`] || inputLang?.title || null;
      output.description = data[`description-${curr.id}`] || inputLang?.description || '';

      return [...acc, output];
    }, []);

    onFormSubmit({
      has_params: false,
      name: data[`name-1`] ?? data.name,
      is_draft: isDraft,
      page_languages,
      parent,
      page_type: 'General',
      widgets: updateCollection,
      template: templateId.toString(),
    });
    reset();
  };

  const handleCancel = () => {
    dispatch(handleModal({ id: '' }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="mt-5">
          <StyledTabs className="" value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
            {clientLanguage?.map((lang, index) => (
              <StyledTab key={lang.id} className="capitalize text-lg" label={lang.name} {...a11yProps(index)} />
            ))}
          </StyledTabs>
        </Box>

        {clientLanguage?.map((lang, index) => (
          <TabPanel key={lang.id} value={valueTab} index={index}>
            <div className="hidden">{defaultValues && <InputContainer name="name" control={control} hidden className="hidden" />}</div>
            <InputContainer
              name={`name-${lang.id}`}
              control={control}
              label="Page Title"
              // value=""
              defaultValue={devLang[index]?.name}
              // defaultValue={lang?.id === l?.language && l?.name}
              // errors={errors.name}
            />
            <InputContainer
              name={`title-${lang.id}`}
              control={control}
              label="Url Text"
              // value=""
              defaultValue={devLang[index]?.title}
              // defaultValue={lang?.id === l?.language && l?.name}
              // errors={errors.name}
            />
            <InputContainer
              name={`description-${lang.id}`}
              control={control}
              label="Description"
              // value=""
              defaultValue={devLang[index]?.description}
              // defaultValue={lang?.id === l?.language && l?.name}
              // errors={errors.name}
            />
          </TabPanel>
        ))}

        <div className="">
          <Controller
            name="widgets"
            control={control}
            render={({ field: { onChange } }) => (
              <CustomSelect
                options={optionsWidget}
                defaultValue={resultsCollection}
                placeholder="Select Collections"
                isMulti
                onChange={(v) => onChange(v?.map((val) => val.value))}
              />
            )}
          />
        </div>
        <div className="mt-5">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Publicity</FormLabel>
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={isDraft} onChange={handleChangeDraft}>
              <FormControlLabel value={false} control={<Radio />} label="Publish" />
              <FormControlLabel value={true} control={<Radio />} label="Draft" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="ml-auto flex gap-x-3 mt-7">
          <Button onClick={handleCancel} className="ml-auto flex" type="button" variant="outlined">
            Cancel
          </Button>
          <Button className="flex" type="submit" variant="outlined">
            {`${defaultValues ? 'UPDATE Page' : ' Add Page'}`}
          </Button>
        </div>
      </div>
    </form>
  );
}
