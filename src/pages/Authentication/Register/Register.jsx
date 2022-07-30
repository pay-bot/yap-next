import { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { defaultValues, schema } from './validation';
// import { Toast } from '../../components'
// import { useAuth } from '../../context'
import useStyles from './Style';
import { useRegisterMutation } from '../../../features/authApi';
import { setAdminToken } from '../../../features/authReducer';
import InputContainer from '../../../components/input/InputContainer';

function Register() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [singUp, response] = useRegisterMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: schema, defaultValues });
  const styles = useStyles();

  const onSubmit = async (data) => {
    try {
      await singUp(data);
      // navigate("/");
    } catch ({ code }) {
      setError(code);
      setOpen(true);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      Cookies.set('admin-token', response?.data?.token);
      Cookies.set('admin-name', response?.data?.user?.name);
      dispatch(setAdminToken(response?.data?.token));
      // navigate('/dashboard/products');
    }
  }, [response.isSuccess]);

  return (
    <Card className={styles.wrapper}>
      {/* <Toast title='Error' type='error' open={open} message={error} onClose={handelClose} autoHideDuration={5000} /> */}
      <CardContent>
        <Typography variant="h4" component="h1" paragraph>
          Sing up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm>
              <InputContainer name="firstname" control={control} error={errors?.name} label="first name" autoComplete="name" fullWidth />
            </Grid>
            <Grid item xs={12} sm>
              <InputContainer control={control} name="lastname" error={errors?.lastName} label="last name" fullWidth />
            </Grid>
            {/* <Grid item xs={12}>
							<InputContainer
								control={control}
								error={errors?.['phone Number']}
								label='phone Number'
								placeholder='09123456789'
								autoComplete='phone'
								fullWidth
							/>
						</Grid> */}
            <Grid item xs={12}>
              <InputContainer control={control} name="email" error={errors?.email} type="email" label="email" autoComplete="email" placeholder="example@gmail.com" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <InputContainer control={control} error={errors?.password} label="password" type="password" name="password" fullWidth autoComplete="new-password" />
            </Grid>
            <Grid item xs={12}>
              <InputContainer
                control={control}
                error={errors?.password_confirmation}
                label="password confirmation"
                name="password_confirmation"
                type="password"
                fullWidth
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <button variant="contained" color="primary" type="submit" fullWidth>
                send
              </button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
