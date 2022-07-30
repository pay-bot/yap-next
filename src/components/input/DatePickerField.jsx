import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TextField } from '@mui/material';

export default function DatePickerField({ control, name, inputFormat, mask, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat={inputFormat || 'yyyy-MM-dd'}
            mask={mask || '____-__-__'}
            onChange={onChange}
            value={value}
            // defaultValue={new Date()}
            renderInput={(params) => <TextField {...params} {...rest} />}
          />
        </LocalizationProvider>
      )}
    />
  );
}
