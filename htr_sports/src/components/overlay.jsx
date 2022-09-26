import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

const Overlay = ({ isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            {children}
        </Modal>
    )
}

export default Overlay;