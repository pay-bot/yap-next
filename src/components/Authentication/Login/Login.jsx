import { useEffect } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { defaultValues, schema } from './validation';
// import { Toast } from '../../components'
import Input from '../FormTools/CustomTextField';
import useStyles from './Style';
import { useLoginMutation } from '../../../features/authApi';
import { setAdminToken } from '../../../features/authReducer';

function Login() {
  // const { login, googleSingIn } = useAuth()
  const [login, response] = useLoginMutation();

  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: schema, defaultValues });

  const onSubmit = async (data) => {
    try {
      await login(data);
      // navigate('/')
    } catch ({ code }) {
      console.log(code);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      Cookies.set('admin-token', response?.data?.token);
      Cookies.set('admin-name', response?.data?.user?.firstname);
      dispatch(setAdminToken(response?.data?.token));
      // navigate('/dashboard/products');
    }
  }, [response.isSuccess]);
  // const handelGoogleSingIn = async () => {
  // 	try {
  // 		await googleSingIn()
  // 		navigate('/')
  // 	} catch ({ code }) {
  // 		setError(code)
  // 		setOpen(true)
  // 	}
  // }
  return (
    <Card className={styles.wrapper}>
      {/* <Toast title='Error' type='error' open={open} message={error} onClose={handelClose} autoHideDuration={5000} /> */}
      <img src="/yaplogofullblack.svg" alt="" className="my-10 mx-auto" />
      <CardContent>
        <div className="space-x-4 pb-4">
          <span className="">email : user@mail.com</span>
          <span className="">password : user</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <Input control={control} error={errors?.email} type="email" label="email" autoComplete="email" placeholder="example@gmail.com" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Input control={control} error={errors?.password} type="password" label="password" autoComplete="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <button variant="contained" fullWidth type="submit">
                Login
              </button>
            </Grid>
            <Grid item xs={12}>
              {/* <button variant='contained' fullWidth onClick={handelGoogleSingIn}>
								google
							</button> */}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
