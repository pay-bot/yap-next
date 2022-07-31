import { Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';

function CheckBoxContainer({ name, control, label, errors, defaultValue }) {
  return (
    <>
      <FormControlLabel
        sx={{ width: '100%', mt: 2, mb: 1 }}
        control={
          <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({ field }) => <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={!!field.value} />}
          />
        }
        label={label}
      />
      {!!errors && <FormHelperText error={!!errors}>{errors?.message}</FormHelperText>}
    </>
  );
}

export default CheckBoxContainer;
