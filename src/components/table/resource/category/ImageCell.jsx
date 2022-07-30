export default function ImageCell({ column, row }) {
  const photos = [];
  row.original[column.imgAccessor].map((col) => {
    return photos.push(col);
  });
  return (
    <div className="flex gap-x-1">
      {photos.slice(0, 5).map((img) => (
        <div key={img.id} className="flex items-center">
          <div className="flex-shrink-0 ">
            {/* {row.original[column.imgAccessor].length} */}
            <img className="h-20 w-full object-cover" src={img.url} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
