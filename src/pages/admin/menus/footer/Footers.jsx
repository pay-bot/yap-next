import { useSelector } from 'react-redux';
import FooterMenu from './FooterMenu';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useMenusFooterData } from '../../../../hooks/useMenusFooterData';

function Footers() {
  const { data: footers } = useMenusFooterData();

  console.log(footers?.data);
  const sidebar = useSelector((state) => state.sidebar.isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="main-container  ">
      {/* <PerfectScrollbar> */}

      <section className="w-full">
        {footers?.data?.map((route) => {
          if (route.parent_id === 0) {
            return <FooterMenu key={route.id} setIsOpen={sidebar} route={route} showAnimation={showAnimation} isOpen={sidebar} />;
          }
          return null;
        })}
      </section>
      {/* </PerfectScrollbar> */}
    </div>
  );
}

export default Footers;
