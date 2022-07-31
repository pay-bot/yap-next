import { useQuery } from "@tanstack/react-query";
import { fetchSections } from "../../../hooks/useSectionsData";

function FooterWeb() {
  const pageId = 1;
  const { data: section } = useQuery(["sections", { pageId }], fetchSections);
  // const navItems = [];

  const dataApi = section?.data?.model;
  const menuApi = section?.data?.menuAll;

  // let heading;
  let media;
  const price = [];
  // console.log("p", pageSections);
  if (dataApi) {
    const sec = dataApi?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((se) => {
          switch (se.id) {
            case 8:
              se?.components.forEach((contents, i) => {
                price.push(contents);
                switch (i) {
                  case 0:
                    // heading = contents?.heading;
                    // content = contents?.content;
                    media = `https://yap-admin.herokuapp.com/uploads/images/${contents?.media}`;
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
  return (
    <div className="mt-24 pt-12 pb-8">
      <div className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto mb-12 text-center sm:text-left flex md:flex-row flex-col items-center md:gap-y-0 gap-y-4">
        <div className="mx-auto sm:ml-0 ">
          <img className="cursor-pointer w-40" src={media} alt="logo" />
        </div>
        <div className=" flex gap-x-4 justify-center w-4/12">
          <img className="icon-button" src="./images/insta-icon.svg" alt="" />
          <img className="icon-button" src="./images/fb-icon.svg" alt="" />
          <img className="icon-button" src="./images/twitter-icon.svg" alt="" />
        </div>

        <div className="flex gap-x-5 w-4/12 md:justify-end justify-center">
          {menuApi?.map((data) => {
            if (data.collection_id === 2) {
              return <p className="">{data.name}</p>;
            }
            return null;
          })}
        </div>
      </div>

      <p className="text-center mt-12">
        Made With Love By Product All Right Reserved
      </p>
    </div>
  );
}

export default FooterWeb;

