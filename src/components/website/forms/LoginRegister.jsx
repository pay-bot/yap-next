import { useDispatch } from 'react-redux';
import { openModal } from '../../features/modal/modalSlice';

function LoginRegister() {
  const dispatch = useDispatch();

  return (
    <div className="login-register">
      <button className="btn" onClick={() => dispatch(openModal({ componentName: 'Login' }))}>
        Login
      </button>
      <div>OR</div>
      <button className="btn" onClick={() => dispatch(openModal({ componentName: 'Register', position: 'bottom' }))}>
        Register
      </button>
    </div>
  );
}

export default LoginRegister;
