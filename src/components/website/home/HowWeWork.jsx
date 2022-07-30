import ReactHtmlParser from 'react-html-parser';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import { useArticlesQuery, usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function HowWeWork() {
  const { data: pageSections = [] } = usePagesQuery();
  const { data: theme = [] } = useThemesQuery();
  const { data: articles = [] } = useArticlesQuery();
  let title;
  let content;
  let action;

  if (pageSections) {
    const sec = pageSections?.model?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section, i) => {
          switch (section.id) {
            case 5:
              title = section?.components[0]?.heading;
              content = section?.components[0]?.content;
              action = section?.components[0]?.action_name;

              break;
            default:
              break;
          }
        });
      }
    }
  }

  let bgSect;
  let txtColorSection;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((theme, i) => {
        const t = theme ?? theme;
        if (t && t.length !== 0) {
          bgSect = t.bgroundSection;
          txtColorSection = t.txtcolorscdSection;
        }
      });
    }
  }

  const CaptionArticle = styled.p`
    ${tw`font-bold uppercase`}
    color : ${txtColorSection};
  `;

  return (
    <div className="flex py-8 bg-white xl:py-16 ">
      <div className="w-11/12 mx-auto md:w-full md:mx-0 ">
        <div className="flex justify-center mx-auto">
          <div className="max-w-2xl">
            <CaptionArticle className="text-center">{action}</CaptionArticle>
            <div className="py-8 text-4xl text-center">{title}</div>
            <div className="pb-8 text-center lg:pb-0">{ReactHtmlParser(content)}</div>
          </div>
        </div>
        <div className="grid w-11/12 mx-auto gap-y-8 md:gap-y-0 md:grid-cols-2 lg:grid-cols-3 gap-x-10 2xl:pt-16 xl:pt-8">
          {articles[0]?.map((data, i) => {
            console.log('art', data);
            if (data.category_id === 1) {
              return (
                <Link to="/">
                  <div className="">
                    <div className="card-zoom">
                      {data.photos?.map((data) => (
                        <div className="imgBox ">
                          <img src={data.url} alt="" className="" />
                        </div>
                      ))}
                    </div>
                    <div className="p">
                      <CaptionArticle className="py-4 text-left">{action}</CaptionArticle>
                      <p className="pb-4 font-semibold capitalize">{data.name}</p>
                      <div className="">{ReactHtmlParser(data.content)}</div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
