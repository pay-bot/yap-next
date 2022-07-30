import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useRegisterMutation } from '../features/authApi';
// import logor from '../../public/logor.svg'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutDuration = window._DATADOG_SYNTHETICS_BROWSER ? 90000 : 2000;
  const loader = () => {
    return <ReactLoading type="spokes" color="#5433ff" height="4%" width="4%" />;
  };
  const [register, data] = useRegisterMutation();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(timeoutDuration);
    await register(state);
    // push('/');
  };
  return (
    <div className="flex  h-full w-full flex-col items-center justify-center   px-44 pb-16 md:h-screen md:pb-0 ">
      <Link to="/">
        <h2 className=" pb-16 pt-8 text-2xl font-semibold md:pt-0">BakulGadget</h2>
      </Link>
      <div className="flex flex-col justify-center   md:flex-row">
        <div className="mx-auto w-72 pb-8 md:w-96 md:pb-0">
          <Link to="/">
            <img src="logor.svg" alt="" className="h-full w-full" />
          </Link>
        </div>
        <div className="w-80 rounded border p-8 shadow-xl md:w-96">
          <form onSubmit={onRegister}>
            <div className="section">
              <input type="text" name="name" placeholder="Book name" onChange={handle} value={state.name} required className="input" />
              <label className="label" html="name">
                Name
              </label>
              <div className="error" />
            </div>
            <div className="section">
              <input type="text" name="email" onChange={handle} value={state.email} placeholder="Book author" required className="input" />
              <label className="label" html="name">
                Email
              </label>
              <div className="error" />
            </div>
            <div className="section">
              <input type="text" name="password" placeholder="Book name" onChange={handle} value={state.password} required className="input" />
              <label className="label" html="name">
                Password
              </label>
              <div className="error" />
            </div>
            <div className="section">
              <input type="text" name="password_confirmation" onChange={handle} value={state.password_confirmation} placeholder="Book author" required className="input" />
              <label className="label" html="name">
                Password Confirmation
              </label>
              <div className="error" />
            </div>
            {isLoading && (
              <div id="loaderSection" className="display-section-component">
                {loader()}
              </div>
            )}
            <button className="mb-4 rounded bg-blue-500 px-2 py-1 text-white" type="submit">
              Register
            </button>
          </form>
          <div className="">
            Already have account?{' '}
            <span className="text-blue-500">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
