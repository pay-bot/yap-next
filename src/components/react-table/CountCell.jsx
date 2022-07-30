export function CountCell({ value, column, row }) {
  // row.original[column.imgAccessor].map((data) => {
  //   console.log('g', data)
  // })
  return (
    <>
      {/* {row.original[column.imgAccessor].map((data) => ( */}
      <div className="flex items-center">
        <div className="w-40 flex-shrink-0 ">
          {row.original[column.countAccessor].length}
          {/* <img
          className="h-20 w-full object-cover"
          src={data.url}
          alt=""
        /> */}
        </div>
      </div>

      {/* ))} */}
    </>
  );
}
