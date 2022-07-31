import { useRouter } from "next/router";

export default function Add({ onClick, title, link, tooltip }) {
  const router = useRouter();

  return link ? (
    <button
      type="button"
      tooltip={tooltip}
      onClick={() => [navigate(link), onClick]}
      className="flex w-fit h-fit cursor-pointer items-center rounded bg-[#e8fbfd] p-1 text-[#11c5db] shadow hover:bg-[#11c5db] hover:text-white"
    >
      <img src="/add.svg" alt="" className="mr-1 w-4" />
      <div className="text-sm font-semibold">{title}</div>
    </button>
  ) : (
    <button
      type="button"
      tooltip={tooltip}
      onClick={onClick}
      className="flex h-fit w-fit cursor-pointer items-center rounded bg-[#e8fbfd] p-1 text-[#11c5db] shadow hover:bg-[#11c5db] hover:text-white"
    >
      <img src="/add.svg" alt="" className="mr-1 w-4" />
      <div className="text-sm font-semibold">{title}</div>
    </button>
  );
}

