import { Link } from 'react-router-dom';
import TooltipWrapper from '../materialUI/TooltipWrapper';

export default function AddMedia({ link, tooltip, onClick }) {
  return (
    <TooltipWrapper tooltip={tooltip}>
      <Link to={link}>
        <div className="flex h-fit cursor-pointer items-center rounded-sm bg-indigo-100 p-1 text-indigo-900 shadow hover:bg-indigo-900 hover:text-white tooltip">
          <div className="w-4 ">
            <img src="/media.svg" alt="" className="mr-1 w-full " />
          </div>
        </div>
      </Link>
    </TooltipWrapper>
  );
}
