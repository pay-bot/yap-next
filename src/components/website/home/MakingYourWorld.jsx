import { useEffect, useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import tw, { styled } from 'twin.macro';
import { usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function MakingYourWorld() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections = [] } = usePagesQuery();

  let action;
  let title;
  let content;
  let action2;
  let title2;
  let content2;
  let video;

  const image = [];
  if (pageSections) {
    const sec = pageSections?.model?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 3:
              action = section?.components[0]?.action_name;
              title = section?.components[0]?.heading;
              content = section?.components[0]?.content;
              section?.components[0]?.photos?.forEach((data) => {
                image.push(data);
              });
              action2 = section?.components[1]?.action_name;
              title2 = section?.components[1]?.heading;
              content2 = section?.components[1]?.content;
              video = section?.components[1]?.action_url;

              break;
            default:
              break;
          }
        });
      }
    }
  }

  let bgPage;
  let bgSect;
  let txtColorSection;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((th) => {
        const t = th ?? th;
        if (t && t.length !== 0) {
          bgPage = t.bgroundPage;
          bgSect = t.bgroundSection;
          txtColorSection = t.txtcolorscdSection;
        }
      });
    }
  }

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  const CaptionArticle = styled.p`
    ${tw`font-bold uppercase `}
    color : ${txtColorSection};
  `;

  const ImageGrid = styled.p`
    ${tw`flex items-center justify-center h-full py-10 transition duration-500 transform hover:scale-110 `}
    background-color : ${bgPage};
  `;
  console.log('im', pageSections);
  return (
    <div className="bg-white py-8 xl:py-16">
      <div className="relative w-full py-16 md:h-full ">
        <div className="hd:pl-16 hd:pr-24 flex h-full w-full flex-col items-center lg:flex-row lg:pl-10 lg:pr-5 xl:pl-20 xl:pr-20 2xl:pl-32 2xl:pr-28">
          <div className="flex h-full items-center justify-center lg:w-4/12 xl:w-5/12">
            <div className="mx-auto w-11/12 md:w-6/12 lg:w-full ">
              <CaptionArticle>{action}</CaptionArticle>
              <div className="py-8 text-3xl lg:text-5xl">{title}</div>
              <div className="text-lg">{ReactHtmlParser(content)}</div>
            </div>
          </div>
          <div className="hd:pl-16 h-full w-10/12 pt-8 lg:w-8/12 lg:pl-5 lg:pt-0 xl:w-7/12 xl:pl-20 2xl:pl-32">
            <div className="grid h-full grid-cols-1 gap-10 gap-y-8 md:grid-cols-3 ">
              {image.map((data) => (
                <ImageGrid key={data.id}>
                  <div className="">
                    <img src={data.url} alt="" className="mx-auto h-20 w-20 " />
                    <p className="pt-4 text-center">{data.name}</p>
                  </div>
                </ImageGrid>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="hd:pl-20 flex w-full flex-col items-center pl-8 md:flex-row xl:pl-24 2xl:pl-36 ">
          <div className="md:w-3/12 ">
            <div className="">
              <CaptionArticle>{action2}</CaptionArticle>
              <p className="py-8 pr-8 text-3xl md:pr-8 lg:pr-0 lg:text-5xl">{title2}</p>
              <div className="pr-8 text-lg md:pr-8 lg:pr-0">{ReactHtmlParser(content2)}</div>
            </div>
          </div>
          <div className="hd:pr-36 pt-8 pr-8 md:w-9/12 md:pt-0 md:pl-10 xl:pr-28 2xl:pr-44">
            <video className="" style={{ maxWidth: '100%', width: '100%', margin: '' }} playsInline loop muted controls alt="All the devices" src={video} ref={videoEl} />
          </div>
        </div>
      </div>
    </div>
  );
}
