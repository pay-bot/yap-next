import Back from '../button/Back';

export default function ContentHeading({ children }) {
  return (
    <div className="pb-1 rounded-md bg-[#1F2937] ">
      <div className="bg-white px-4 py-5 ">
        <div className="flex justify-between  relative">
          <div type="button" className="">
            <Back />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
