export default function Header() {
  return (
    <div className="z-30 w-screen bg-white bg-opacity-80">
      <div className="xl:w-9/12 w-10/12 flex mx-auto z-10 items-center py-5">
        <div className="w-5/12 flex">
          <img src="" alt="" className="xl:w-14 xl:h-8 w-10 h-6" />
          <div className="xl:-ml-3 flex justify-center items-center">
            <div className="">
              <p className="uppercase text-xs 2xl:tracking-widest xl:tracking-wider tracking-wide">PROGRAM</p>
              <p className="uppercase font-bold 2xl:text-base xl:text-sm text-xs">KARYA NYATA SOSIAL</p>
            </div>
          </div>
        </div>
        <div className="w-screen">
          <ul className="flex justify-center 2xl:text-base xl:text-sm text-xs space-x-9 items-center">
            <li className="">tes</li>
            <li className="">tes</li>
            <li className="">tes</li>
            <li className="">tes</li>
            {/* {menus.map((data, i) => (
                <li key={i} className="">
                  <Link to={data.url}>{data.title}</Link>
                </li>
              ))} */}
          </ul>
        </div>
        <div className="w-4/12 relative flex justify-end items-center">
          {/* {sections.map((data, i) =>
              data.widgets[4]?.widget_contents.map((data, i) => (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-red-600 text-white text-xs 2xl:py-4 py-2 2xl:px-16 px-10 rounded-3xl"
                >
                  {data.content}
                </button>
              ))
            )} */}
        </div>
      </div>
      <div className="h-full w-4/12 justify-center items-center flex mx-auto " />
    </div>
  );
}
