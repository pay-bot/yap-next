import moment from 'moment';
import { useArticlesData } from '../../../hooks/useArticlesData';
import WebLayout from '../../../components/website/layout/WebLayout';
import BlogItem from '../../../components/website/new-home/BlogItem';

export default function Blog() {
  const { data: articles } = useArticlesData();

  const art = [];
  articles?.data[0]?.map((data) => {
    if (data.category_id === 2) {
      return art.push(data);
    }
    return null;
  });

  console.log('art', art);
  return (
    <div className=" md:px-16 px-4 pb-16 top-0 absolute w-full h-full">
      <WebLayout className="w-full mx-auto flex justify-between shadow-md md:shadow-none h-20 absolute inset-x-0 z-50 bg-black px-10">
        <div className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto  flex flex-col items-center mt-24">
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {art.map((data) => (
              <BlogItem
                key={data.id}
                imgSrc={data?.photos[0]?.url}
                tags={data?.tags}
                author="Fahri"
                link={`/blog/${data.slug}`}
                date={moment(data.created_at.toString()).format('DD-MMMM-YYYY')}
                title={data.name}
              />
            ))}
          </div>
        </div>
      </WebLayout>
    </div>
  );
}
