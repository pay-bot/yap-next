import FooterWeb from '../new-home/FooterWeb';
import Header from '../new-home/Header';

export default function WebLayout({ children, className, isShop, isSuccess }) {
  return (
    <>
      <Header className={className} isShop={isShop} />
      {children}
      <FooterWeb />
    </>
  );
}
