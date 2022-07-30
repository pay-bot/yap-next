import { useParams } from 'react-router-dom';
import moment from 'moment';
import tw, { styled } from 'twin.macro';
import WebLayout from '../../../components/website/layout/WebLayout';
import { useArticlesData } from '../../../hooks/useArticlesData';

export default function BlogDetail() {
  const { blogSlug } = useParams();

  const { data: articles } = useArticlesData();

  const art = articles?.data[0]?.map((data) => {
    if (data.slug === blogSlug) {
      return data;
    }
    return null;
  });

  // console.log('art', art)

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   const user = {
  //     username: this.state.username,
  //     phone: this.state.phone
  //   }

  //   axios
  //     .post(`https://jsonplaceholder.typicode.com/users`, { user })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     });
  // };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const tes = stringToColor('css');

  console.log('test', tes);

  const TagWrapper = styled.div`
    ${tw`text-xs`}
    background-color: ${(props) => props.inputColor || 'white'};
  `;

  return (
    <div className=" md:px-16 px-4 pb-16 top-0 absolute w-full h-full">
      <WebLayout className="w-full mx-auto flex justify-between shadow-md md:shadow-none h-20 absolute inset-x-0 z-50 bg-black px-10">
        <div className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto  flex flex-col items-center mt-24">
          <div key={art?.id} className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-8/12">
              <div className="md:mt-5">
                <p className="pb-5 text-gray-700 dark:text-white">BLOG /</p>
                <h1 className="text-4xl font-semibold text-gray-700 md:text-5xl dark:text-white md:font-bold">{art?.name}</h1>
                <div className="flex flex-wrap gap-x-1 py-1">
                  {art?.tags?.map((data) => (
                    <TagWrapper key={data.id} inputColor={`${stringToColor(data.name)}`}>
                      {data.name}
                    </TagWrapper>
                  ))}
                </div>
                <div className="flex my-5">
                  <p className="text-xs text-white0 dark:text-gray-100"> {moment(art?.created_at.toString()).format('DD-MMMM-YYYY')}</p>
                  <p className="text-xs text-white0 dark:text-gray-100">&nbsp; - Fahri</p>
                </div>
              </div>
              <img src={art?.photos[0].url} alt="" className="object-center w-full" />
              {/* <Image
              src={detail.img_url}
              alt=""
              className="md:w-screen md:h-[600px] mt-5"
              layout="fill"
              objectFit="fill"
              loading="eager"
              priority
            /> */}
              {/* <div className="object-center w-full">
              <Image
                objectFit="cover"
                src={detail.img_url}
                alt="Profile"
                loading="lazy"
                placeholder="blur"
                blurDataURL={dataBlur}
                width="100%"
                height="100%"
                layout="responsive"
              />
            </div> */}
              <div className="my-5">
                <div className="text-gray-700 dark:text-white" dangerouslySetInnerHTML={{ __html: art?.content }} />
              </div>
            </div>

            {/* <div className="flex flex-col my-5 ml-0 lg:w-4/12 lg:ml-5">
            <div className="flex mb-5 border-b-2 border-black">
              <p className="inline-block px-2 py-1 text-white bg-black text-md">
                RECENT POST
              </p>
            </div>
            <div className="">
              {initialPost.map((data, i) => (
                <Link
                  key={i}
                  href={`/blog/${language === "en" ? data.slug : data.slug_idn
                    }`}
                >
                  <a className="">
                    <p className="text-base text-gray-700 capitalize hover:text-blue-600 dark:hover:text-blue-400 dark:text-white">
                      {language === "en" ? data.title : data.title_idn}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div> */}
          </div>
        </div>
      </WebLayout>
    </div>
  );
}
