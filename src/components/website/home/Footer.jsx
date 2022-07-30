import tw, { styled } from 'twin.macro';
import ReactHtmlParser from 'react-html-parser';
import { useFootersQuery, usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function Footer() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections = [] } = usePagesQuery();
  const { data: footer = [] } = useFootersQuery();

  let bgPage;
  let bgSect;
  let txtColorSection;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((theme, i) => {
        const t = theme ?? theme;
        if (t && t.length !== 0) {
          bgPage = t.bgroundPage;
          bgSect = t.bgroundSection;
          txtColorSection = t.txtcolorscdSection;
        }
      });
    }
  }
  let bgEachSection;
  let action;
  let title;
  let content;
  let logo;
  let contentFooter;

  if (pageSections) {
    const sec = pageSections?.model?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section, i) => {
          switch (section.id) {
            case 13:
              bgEachSection = section.bgroundsection;
              action = section?.components[1]?.action_name;
              title = section?.components[1]?.heading;
              content = section?.components[1]?.content;
              contentFooter = section?.components[2]?.content;
              section?.components[0]?.photos?.map((data, i) => {
                logo = data.url;
              });

              break;
            default:
              break;
          }
        });
      }
    }
  }

  const SectionWrapper = styled.div`
    ${tw`w-full h-full `}
    background-color: ${bgEachSection};
  `;
  const FooterWrapper = styled.div`
    ${tw`w-full h-full px-8 py-8 xl:py-16`}
    background-color: ${bgSect};
  `;

  return (
    <div className="pt-16 bg-white ">
      <SectionWrapper>
        <div className="flex items-center justify-center max-w-2xl py-8 mx-auto xl:py-16">
          <div className="">
            <div className="pb-4 text-sm font-semibold text-center text-white">{action}</div>
            <div className="text-4xl text-center text-white ">{ReactHtmlParser(content)}</div>
          </div>
        </div>
      </SectionWrapper>
      <FooterWrapper>
        <div className="flex flex-col justify-around w-full md:flex-row">
          <div className="flex flex-col w-full lg:w-7/12 md:w-6/12 lg:flex-row">
            <div className="flex justify-center w-full md:w-3/12 lg:w-2/12 md:justify-start lg:mx-0 md:mx-8 md:pb-4">
              <img src={logo} alt="" className="w-20" />
            </div>
            <div className="flex grid grid-cols-1 px-8 py-8 md:w-11/12 lg:grid-cols-3 md:py-0 ">
              {footer.map((data) => (
                <p className="text-center text-white md:text-left">{data.name}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full md:w-6/12 lg:w-4/12 md:justify-start md:items-center">
            <div className="prose text-center text-gray-300 md:text-left">{ReactHtmlParser(contentFooter)}</div>
          </div>
        </div>
      </FooterWrapper>
    </div>
  );
}
