// import { NavLink } from "react-router-dom";

// import { BiAnalyse, BiSearch } from "react-icons/bi";

// import { AnimatePresence, motion } from "framer-motion";
// import HeaderMenu from "./HeaderMenu";
// import { useSelector } from "react-redux";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import { useMenusHeaderData } from "../../../../hooks/useMenusData";

// const Headers = ({ children }) => {
//   const onSuccess = (data) => {
//     console.log({ data });
//   };

//   const onError = (error) => {
//     console.log({ error });
//   };

//   const { isReactLoading, data: headers, isError, error, refetch } = useMenusHeaderData();

//   console.log(headers?.data);
//   const sidebar = useSelector((state) => state.sidebar.isOpen);

//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: "140px",
//       padding: "5px 15px",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <>
//       <div className="main-container  ">

//           {/* <PerfectScrollbar> */}

//             <section className="w-full">
//               {headers?.data?.map((route, index) => {
//                 if (route.parent_id === 0) {
//                   return <HeaderMenu key={index} setIsOpen={sidebar} route={route} showAnimation={showAnimation} isOpen={sidebar} />;
//                 }
//               })}
//             </section>
//           {/* </PerfectScrollbar> */}
//       </div>
//     </>
//   );
// };

// export default Headers;
