import { Link } from 'react-router-dom';

function BlogItem({ imgSrc, author, date, title, link, tags }) {
  return (
    <div className="border text-left hover:shadow-lg active:shadow-none cursor-pointer hover:scale-105 active:scale-95 transition ">
      <div className="aspect-w-16 aspect-h-9">
        <img className=" h-full w-full object-cover" src={imgSrc} alt="" />
      </div>
      <div className="px-4 pt-6 pb-10">
        <div className="flex flex-wrap gap-x-1 py-1">
          {tags.map((data) => (
            <div key={data.id} className="text-xs bg-gray-300 px-1">
              {data.name}
            </div>
          ))}
        </div>
        <p className="text-base">
          By <span className="font-bold hover:text-primary transition ease-out">{author}</span> | {date}
        </p>
        <Link to={link || '/'}>
          <h3 className="font-bold text-2xl mt-3 hover:text-primary transition ease-out">{title}</h3>
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
