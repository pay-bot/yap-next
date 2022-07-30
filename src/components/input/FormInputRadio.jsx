import { FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { Controller } from 'react-hook-form';
// import { FormInputProps } from './FormInputProps';

const options = [
  {
    label: 'Radio Option 1',
    value: '1',
  },
  {
    label: 'Radio Option 2',
    value: '2',
  },
];

export function FormInputRadio({ onChange, name, control, label, onClick, value }) {
  const generateRadioOptions = () => {
    return options.map((singleOption) => <FormControlLabel value={singleOption.value} label={singleOption.label} control={<Radio />} />);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error }, formState }) => <FormControlLabel onChange={onChange} value={value} label={label} onClick={onClick} control={<Radio />} />}
      />
    </FormControl>
  );
}
