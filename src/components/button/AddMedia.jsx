import TooltipWrapper from "../materialUI/TooltipWrapper";
import Link from "next/link";

export default function AddMedia({ link, tooltip, onClick }) {
  return (
    <TooltipWrapper tooltip={tooltip}>
      <Link href={link}>
        <a>
          <div className="flex h-fit cursor-pointer items-center rounded-sm bg-indigo-100 p-1 text-indigo-900 shadow hover:bg-indigo-900 hover:text-white tooltip">
            <div className="w-4 ">
              <img src="/media.svg" alt="" className="mr-1 w-full " />
            </div>
          </div>
        </a>
      </Link>
    </TooltipWrapper>
  );
}

