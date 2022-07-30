import moment from 'moment';
import BlogItem from './BlogItem';
import { useArticlesData } from '../../../hooks/useArticlesData';

function Blogs() {
  const { data: articles } = useArticlesData();

  const art = [];
  articles?.data[0]?.map((data) => {
    if (data.category_id === 2) {
      return art.push(data);
    }
    return null;
  });

  console.log('art', articles);
  return (
    <section className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-28 text-center md:text-left flex flex-col items-center">
      <h2 className="text-4xl font-bold">Contents Strategies</h2>
      <p className="font-medium mt-2">We focus on ergonomics and meeting you where you work. It&apos;s only a keystroke away.</p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {art.map((data) => (
          <BlogItem
            key={data.id}
            imgSrc={data?.photos[0]?.url}
            author="Fahri"
            link={`/blog/${data.slug}`}
            date={moment(data.created_at.toString()).format('DD-MMMM-YYYY')}
            title={data.name}
          />
        ))}
        {/* <BlogItem
          imgSrc="images/blog-2.jpg"
          author="Niket Singh"
          date="03 Mar 2019"
          title="Motivation Is The First Step To Success"
        />
        <BlogItem
          imgSrc="images/blog-3.jpg"
          author="Divyanshi "
          date="03 Mar 2019"
          title="Success Steps For Your Personal Or Business"
        />
        <BlogItem
          imgSrc="images/blog-4.jpg"
          author="Manhar"
          date="03 Mar 2019"
          title="Business & Personal Growth With Mindfullness"
        /> */}
      </div>

      <button type="button" className="primary-button mt-10">
        View More
      </button>
    </section>
  );
}

export default Blogs;
