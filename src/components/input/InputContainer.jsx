import { Controller } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function InputContainer({ name, control, type = 'text', label, showPass, showCfPass, handleClickShowPassword, errors, defaultValue, hidden }) {
  return (
    <div className="my-1">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <TextField
            fullWidth
            size="small"
            sx={{ textTransform: 'capitalize' }}
            label={label}
            value={defaultValue || ''}
            hidden={hidden}
            margin="normal"
            error={Boolean(errors)}
            helperText={errors?.message}
            /* eslint-disable */ //nested ternary
            type={type === 'password' ? (showPass ?? showCfPass ? 'text' : 'password') : type}
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPass ?? showCfPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
    </div>
  );
}

export default InputContainer;
