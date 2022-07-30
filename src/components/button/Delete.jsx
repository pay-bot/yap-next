import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import TooltipWrapper from '../materialUI/TooltipWrapper';

export default function Delete({ onClick, tooltip, variant }) {
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
    <TooltipWrapper tooltip={tooltip}>
      <button
        type="button"
        onClick={isAuthenticated.adminName === 'user' ? onClick : notAdmin}
        className={`flex w-fit h-fit cursor-pointer items-center rounded-sm bg-[rgba(248,50,69,.15)] p-1 text-[#f83245] shadow hover:bg-[#f83245] hover:text-[white] tooltip ${
          variant === 'bordered' ? 'border-2 border-white bg-transparent text-white' : 'bg-[rgba(248,50,69,.15)]'
        }`}
      >
        <div className="w-4 ">
          <img src="/trash.svg" alt="" className="mr-1 w-full" />
        </div>
      </button>
    </TooltipWrapper>
  );
}
