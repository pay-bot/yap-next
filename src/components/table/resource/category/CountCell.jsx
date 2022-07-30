export default function CountCell({ column, row }) {
  // row.original[column.imgAccessor].map((data) => {
  //   console.log('g', data)
  // })
  return (
    <>
      {/* {row.original[column.imgAccessor].map((data) => ( */}
      <div className="flex items-center">
        <div className="w-40 flex-shrink-0 ">
          <div className="">Photo : {row.original[column.countAccessor].length}</div>
          <div className="">Video : 0</div>
          <div className="">Documents : 0</div>
        </div>
      </div>

      {/* ))} */}
    </>
  );
}
