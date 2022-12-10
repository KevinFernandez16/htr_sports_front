import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: '#171717',
      transform: 'translate(-50%, -50%)',
      width: "30%",
      height: "80%"
    },
  };
  

const Overlay = ({ isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} >
            {children}
        </Modal>
    )
}

export default Overlay;