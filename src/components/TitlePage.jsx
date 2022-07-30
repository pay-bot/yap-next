import Back from './button/Back';

export default function TitlePage({ description }) {
  return (
    <div className="w-full ">
      <div className="border-l-4 border-green-500 rounded-l-lg  flex  items-center bg-[#FDFDFE] px-4  py-4">
        <div className="realtive">
          {/* <div className="text-2xl font-bold text-[#1F2937] capitalize">{title}</div> */}
          <div className="capitalize">{description || 'This Description'}</div>
        </div>
        <Back />
      </div>
    </div>
  );
}
