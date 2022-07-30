import Header from '../components/website/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className=" w-screen h-screen absolute top-0 items-center 3xl:-mt-36 -mt-20    flex ">
        <div className="w-8/12 mx-auto">
          <p className="3xl:max-w-2xl 2xl:max-w-xl xl:max-w-md max-w-sm 2xl:pb-8 pb-4  z-30  3xl:text-5xl 2xl:text-4xl xl:text-3xl text-2xl font-bold">tes</p>
          <p className="3xl:max-w-2xl 2xl:max-w-xl xl:max-w-md max-w-sm 2xl:pb-8 pb-4 2xl:text-base xl:text-sm text-xs">tes</p>

          <button className="bg-red-600 text-white text-xs 2xl:py-4 xl:py-3 py-2 2xl:px-12 xl:px-8 px-6 rounded-3xl">tes</button>
        </div>
      </div>

      <div className="bg-white w-full h-screen flex 3xl:-mb-100 2xl:-mb-86 xl:-mb-72 -mb-72 bg-opacity-80 ">
        <div className="absolute top-0 -z-10 ">
          <div className=" w-full ">
            <div className="flex top-0">
              <img src="/volunteers.jpg" alt="" className="clip-path-slant-down-righthd  h-screen   w-screen" />
            </div>
          </div>
        </div>
      </div>
      <div className="4xl:w-4/12 3xl:w-5/12 w-7/12  mx-auto px-8 ">
        <p className="3xl:text-5xl 2xl:text-4xl text-2xl  font-bold text-center ">tes</p>
        <p className="text-center 2xl:text-base xl:text-sm text-xs 3xl:py-8 py-6">tes</p>
      </div>
    </>
  );
}
