// import DirectModal from "./DirectModal";
// import { addToCart } from "../features/cartSlice";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function GadgetListCard({ name, image, amount, onClickBuy, onClickModal, modalItemName, showModal, closeModal }) {
  return (
    <div className="bg-white rounded-xl ">
      <div className="p-8">
        <p className="text-left text-xs font-bold">NEW</p>
        <button type="button" onClick={onClickModal} className="text-left pb-4 text-xl font-bold">
          {name}
        </button>
        <div className="w-full 2xl:h-96 h-60 flex justify-center ">
          <img src={image} alt="" className=" object-cover " />
        </div>
        <div className="">
          <div className="py-4">Color</div>
          <div className="flex justify-between">
            <span className="price">${amount}</span>
            <button type="button" onClick={onClickBuy} className="bg-blue-500  px-3 py-1 rounded-2xl text-white font-semibold">
              Buy
            </button>
          </div>
        </div>
        {showModal && (
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="My dialog"
            className="w-6/12 overflow-visible mymodal 3xl:w-5/12 "
            overlayClassName="myoverlay "
            closeTimeoutMS={500}
          >
            <div className="bg-white ">
              <div className="">{modalItemName}</div>

              <div className="">Product Detail On Progress</div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DirectModal from "./DirectModal";
// import { addToCart } from "../features/cartSlice";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// export default function GadgetList(props) {
//   let [data, setData] = useState([]);
//   let [show, setShow] = useState(false);

//   useEffect(() => {
//     setData(props.props);
//   }, []);

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     navigate("/cart");
//   };

//   return (
//     <div key={data.id} className="bg-white rounded-xl  ">
//       <div className="p-8">
//       <p className="text-left text-xs font-bold">NEW</p>
//       <h3 onClick={handleShow} className="text-left pb-4 text-xl font-bold">
//         {data.name}
//       </h3>
//       <div className="w-full h-96 flex justify-center ">
//       {data.photos?.map((data, i) => {
//         if (i === 0) {
//           return (
//             <img src={data.url} alt={data.name} className=" object-cover " />
//           );
//         }
//       })}

//       </div>
//       <div className="">
//         <div className="py-4">Color</div>
//         <div className="flex justify-between">
//         <span className="price">${data.amount}</span>
//       <button onClick={() => handleAddToCart(data)} className="bg-blue-500  px-3 py-1 rounded-2xl text-white font-semibold">Buy</button>

//         </div>
//       </div>
//       {show && (
//         <Modal
//           isOpen={show}
//           onRequestClose={handleClose}
//           contentLabel="My dialog"
//           className="w-6/12 overflow-visible mymodal 3xl:w-5/12 "
//           overlayClassName="myoverlay "
//           closeTimeoutMS={500}
//         >
//           <div className="bg-white">{data.id}</div>
//         </Modal>
//       )}
//       </div>
//     </div>
//   );
// }
