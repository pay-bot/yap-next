import { Link } from 'react-router-dom';
import TooltipWrapper from '../materialUI/TooltipWrapper';

export default function Manage({ onClick, tooltip, link, bg, bgHover, variant }) {
  return (
    <TooltipWrapper tooltip={tooltip}>
      {link ? (
        <Link to={link}>
          <div
            // title={tooltip}
            className={`hover:text-white flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#1bc943] shadow hover:text-[white] tooltip ${
              variant === 'bordered' ? 'border-2 border-white bg-transparent text-white' : 'bg-[#e5f9ed]'
            } ${bgHover || 'hover:bg-[#1bc943]'} `}
          >
            <div className="w-fit flex ">
              <img src="/post.svg" alt="" className="w-4" />
              {/* <span className="tooltiptext tooltip-left">{tooltip ? tooltip : 'Edit'}</span> */}
              <div className="text-sm font-semibold">Manage</div>
            </div>
          </div>
        </Link>
      ) : (
        <button
          type="button"
          // title={tooltip}
          onClick={onClick}
          className={`hover;text-white flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#1bc943] shadow hover:text-[white] tooltip w-fit ${
            variant === 'bordered' ? 'border-2 border-white bg-transparent text-white' : 'bg-[#e5f9ed]'
          } ${bgHover || 'hover:bg-[#1bc943]'} `}
        >
          <div className="w-fit  ">
            <img src="/post.svg" alt="" className="w-4" />
            {/* <span className="tooltiptext tooltip-left">{tooltip ? tooltip : 'Edit'}</span> */}
            <div className="text-sm font-semibold">Manage</div>
          </div>
        </button>
      )}
    </TooltipWrapper>
  );
}
