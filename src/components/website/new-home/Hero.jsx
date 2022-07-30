import tw, { styled } from 'twin.macro';
import ReactHtmlParser from 'react-html-parser';

function Hero({ dataApi }) {
  console.log('dataApi', dataApi);

  // let heading, content
  // dataApi?.map((data) => {

  // })

  // let contentId;
  // let action;
  let heading;
  let content;
  let media;
  let live;
  let docs;
  let heroImg;
  // console.log("p", pageSections);
  if (dataApi) {
    const sec = dataApi?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 3:
              // contentId = section?.id;
              // action = section?.action_name;
              // heading = section?.heading;

              section?.components.forEach((se) => {
                switch (se.id) {
                  case 4:
                    heading = se?.heading;
                    content = se?.content;
                    media = `https://yap-admin.herokuapp.com/uploads/images/${se?.media}`;

                    se?.texts?.forEach((text, i) => {
                      switch (i) {
                        case 0:
                          live = text.title;
                          break;
                        case 1:
                          docs = text.title;
                          break;

                        default:
                          break;
                      }
                    });
                    heroImg = se.photos[0].url;
                    break;
                  default:
                    break;
                }
              });

              break;
            default:
              break;
          }
        });
      }
    }
  }

  // console.log("p", title);

  const HeroStyle = styled.div`
    ${tw`3xl:py-[15vh] md:py-[20vh] py-[13vh] left-0 top-0 w-screen `}
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${heroImg}), linear-gradient(rgba(24, 45, 85, 0.8), rgba(24, 45, 85, 0.8));
    background-blend-mode: overlay;
    @media (min-width: 1600px) {
      clip-path: polygon(100% 0, 100% 90%, 85% 100%, 0 90%, 0 0);
    }
    @media (max-width: 1599px) {
      clip-path: polygon(100% 0, 100% 90%, 85% 100%, 0 90%, 0 0);
    }
  `;

  return (
    // parent div
    <div className="">
      <HeroStyle>
        <div className="flex md:flex-row flex-col items-center h-full relative max-w-screen-lg 2xl:max-w-screen-xl mx-auto space-x-5 md:px-0 px-4">
          <div className="md:w-6/12 w-full">
            <h1 className="font-bold text-4xl md:leading-[60px] text-white uppercase">{heading}</h1>
            <p className="mt-4 text-[18px] leading-[28px] font-normal text-white md:block hidden ">{ReactHtmlParser(content)}</p>
            <div className="mt-8 flex items-center sm:space-x-8 space-x-2">
              <button type="button" className="primary-button">
                {live}
              </button>
              <button type="button" className="secondary-button">
                {docs}
              </button>
            </div>
          </div>
          <div className="md:w-6/12 w-full md:mt-0 mt-10">
            <img src={media} alt="" className="mx-auto" />
          </div>
        </div>
      </HeroStyle>
    </div>
  );
}

export default Hero;
