import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export default function SelectListApi({
  control,
  name,
  label,
  options,
  fullWidth,
  helperText,
  error,
  size,
  sx,
  placeholder,
  disabled,
  // optionLabel,
  ...restProps
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth={fullWidth} size={size} error={error} sx={sx}>
          <InputLabel>{label}</InputLabel>
          <Select disabled={disabled} label={label} {...field} {...restProps} placeholder={placeholder}>
            {options?.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
