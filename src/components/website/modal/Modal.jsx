import CloseSVG from '../../assets/close.svg';

function Modal({ children, isOpen, closeModalHandler, modalChildPosition }) {
  return (
    <>
      <div onClick={closeModalHandler} className={`modal-backDrop ${isOpen ? 'modal-show' : 'modal-hide'}`} />
      <div className={`modal-container ${isOpen ? 'modal-show' : 'modal-hide'}`}>
        <div className="modal-close">
          <img src={CloseSVG} className="modal-close-img" alt="close-modal" onClick={closeModalHandler} />
        </div>
        <div className={`modal-content ${modalChildPosition}`}>{children}</div>
      </div>
    </>
  );
}

export default Modal;
