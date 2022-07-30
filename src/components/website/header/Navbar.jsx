import Navbar2 from './Navbar2';
import Navbar1 from './Navbar1';
import { useThemesQuery } from '../../../features/website/api/apiSlice';

export default function Navbar() {
  const { data: theme = [] } = useThemesQuery();

  let navStyle;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((theme, i) => {
        const t = theme ?? theme;
        if (t && t.length !== 0) {
          navStyle = t.header;
        }
      });
    }
  }

  return (
    <>
      {navStyle === 'header1' && <Navbar1 />}
      {navStyle === 'header2' && <Navbar2 />}
    </>
  );
}
