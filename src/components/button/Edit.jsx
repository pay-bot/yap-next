import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import TooltipWrapper from "../materialUI/TooltipWrapper";
import { resetCollection } from "../../features/articleCollectionSlice";

export default function Edit({ onClick, tooltip, link, bgHover, variant }) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <TooltipWrapper tooltip={tooltip}>
      {link ? (
        <button
          type="button"
          onClick={() => [router.push(link), dispatch(resetCollection())]}
        >
          <div
            // title={tooltip}
            className={` flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#4191ff] shadow hover:text-[white] tooltip ${
              variant === "bordered"
                ? "border-2 border-white bg-transparent text-white"
                : "bg-[rgba(65,145,255,.15)]"
            } ${bgHover || "hover:bg-[#4191ff]"} `}
          >
            <div className="w-4 tooltip ">
              <img src="/edit.svg" alt="" className="w-full" />
              {/* <span className="tooltiptext tooltip-left">{tooltip ? tooltip : 'Edit'}</span> */}
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          // title={tooltip}
          onClick={onClick}
          className={`hover;text-white flex h-fit  cursor-pointer items-center  rounded-sm p-1 text-[#4191ff] shadow hover:text-[white] tooltip w-fit ${
            variant === "bordered"
              ? "border-2 border-white bg-transparent text-white"
              : "bg-[rgba(65,145,255,.15)]"
          } ${bgHover || "hover:bg-[#4191ff]"} `}
        >
          <div className="w-4  ">
            <img src="/edit.svg" alt="" className="w-full" />
            {/* <span className="tooltiptext tooltip-left">{tooltip ? tooltip : 'Edit'}</span> */}
          </div>
        </button>
      )}
    </TooltipWrapper>
  );
}

