import { useSelector } from 'react-redux';
import swal from 'sweetalert';

export default function Submit({ className }) {
  const isAuthenticated = useSelector((state) => state.authReducer);

  const notAdmin = () => {
    swal({
      title: `Your login As ${isAuthenticated.adminName}`,
      text: 'CRUD Operations, will be prosess on Super Admin Role',
      icon: 'warning',
      // buttons: true,
      dangerMode: true,
    });
  };

  return (
    <div className={className || 'flex justify-end px-[38px] pb-5'}>
      {isAuthenticated.adminName === 'user' ? (
        <button type="submit" className="bg-[#1F2937] py-1 px-2 text-white">
          Submit
        </button>
      ) : (
        <button type="submit" onClick={notAdmin} className="bg-[#1F2937] py-1 px-2 text-white">
          Submit
        </button>
      )}
    </div>
  );
}
