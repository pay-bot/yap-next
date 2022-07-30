import ReactHtmlParser from 'react-html-parser';
import tw, { styled } from 'twin.macro';
import { usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function PeopleAndBusiness() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections = [] } = usePagesQuery();

  let title;
  let content;
  let media;

  if (pageSections) {
    const sec = pageSections?.model?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 4:
              title = section?.components[0]?.heading;
              content = section?.components[0]?.content;
              media = section?.components[0]?.media;

              break;
            default:
              break;
          }
        });
      }
    }
  }

  let bgSect;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((th) => {
        const t = th ?? th;
        if (t && t.length !== 0) {
          bgSect = t.bgroundSection;
        }
      });
    }
  }

  const SectionWrapper = styled.div`
    ${tw`w-full h-full py-8 xl:py-16 `}
    background-color: ${bgSect};
  `;
  return (
    <div className="flex py-8 bg-white xl:py-16 ">
      <SectionWrapper>
        <div className="flex items-center justify-center max-w-2xl mx-auto ">
          <div className="">
            <img src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${media}`} alt="" className="w-10 h-10 mx-auto mb-16" />
            <div className="pb-16 text-3xl font-semibold text-center text-white lg:text-5xl">{title}</div>
            <div className="px-8 text-center text-white md:px-0">{ReactHtmlParser(content)}</div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
