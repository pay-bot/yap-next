import { useRouter } from "next/router";

export default function Back() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.goBack()}
      className="ml-auto flex h-8 cursor-pointer items-center rounded bg-[#fffbf2] p-1 text-[#f4772e] shadow hover:bg-[#f4772e] hover:text-white "
    >
      <img src="/back.svg" alt="" className="mr-1 w-4" />
      <div className="text-sm font-semibold">Go back</div>
    </button>
  );
}

