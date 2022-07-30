import { Link } from 'react-router-dom';
import TooltipWrapper from '../materialUI/TooltipWrapper';

export default function Menu({ onClick, tooltip, link, bg, bgHover, variant }) {
  return (
    <TooltipWrapper tooltip={tooltip}>
      {link ? (
        <Link to={link}>
          <div
            // title={tooltip}
            className={`hover:text-white flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#4191ff] shadow hover:text-[white] tooltip ${
              variant === 'bordered' ? 'border-2 border-white bg-transparent text-white' : 'bg-[rgba(65,145,255,.15)]'
            } ${bgHover || 'hover:bg-[#4191ff]'} `}
          >
            <div className="w-4 tooltip ">
              <img src="/bars-right.svg" alt="" className="w-full" />
            </div>
          </div>
        </Link>
      ) : (
        <div
          // title={tooltip}
          onClick={onClick}
          className={`hover;text-white flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#4191ff] shadow hover:text-[white] tooltip w-fit ${
            variant === 'bordered' ? 'border-2 border-white bg-transparent text-white' : 'bg-[rgba(65,145,255,.15)]'
          } ${bgHover || 'hover:bg-[#4191ff]'} `}
        >
          <div className="w-4  ">
            <img src="/bars-right.svg" alt="" className="w-full" />
            {/* <span className="tooltiptext tooltip-left">{tooltip ? tooltip : 'Edit'}</span> */}
          </div>
        </div>
      )}
    </TooltipWrapper>
  );
}
