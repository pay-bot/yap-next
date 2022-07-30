export default function LikeCell({ value }) {
  return (
    <div className="relative w-fit">
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm">{value}</div>
        <img src="/love.svg" alt="" className="w-8 " />
      </div>
    </div>
  );
}
