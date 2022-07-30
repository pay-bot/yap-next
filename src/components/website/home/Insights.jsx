import ReactHtmlParser from 'react-html-parser';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import { useArticlesQuery, usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function Insights() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections = [] } = usePagesQuery();
  const { data: articles = [], isSuccess } = useArticlesQuery();

  let sectionName;
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
            case 8:
              action = section?.components[0]?.action_name;
              content = section?.components[0]?.heading;
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

  const SectionWrapper = styled.div`
    ${tw`w-full h-full py-16 `}
    background-color: ${bgSect};
  `;

  const CaptionArticle = styled.p`
    ${tw`font-bold uppercase `}
    color : ${txtColorSection};
  `;
  return (
    <div className="py-8 bg-white xl:py-16">
      <div className="w-11/12 mx-auto md:w-full md:mx-0">
        <div className="flex justify-center mx-auto">
          <div className="max-w-2xl">
            <CaptionArticle className="text-center">{action}</CaptionArticle>

            <div className="py-8 text-3xl text-center lg:text-5xl">{ReactHtmlParser(content)}</div>
          </div>
        </div>
        <div className="grid w-11/12 py-8 mx-auto md:gap-y-0 gap-y-8 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {articles[0]?.map((data, i) => {
            if ((i > 3) & (i < 7)) {
              return (
                <Link to={`/articles/${data.slug}`}>
                  <div className="">
                    <div className="card-zoom">
                      {data.photos?.map((data) => (
                        <div className="imgBox ">
                          <img src={data.url} alt="" className="" />
                        </div>
                      ))}
                    </div>
                    <div className="p">
                      <CaptionArticle className="py-4 text-left">{data.name}</CaptionArticle>

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
