// import React from 'react';
// import ReactDOM from 'react-dom';

// function Modal(props){
//     return ( 
//         <h1>Hola</h1>
//         // { ReactDOM.createPortal(
//         //     <h1>Hola, realmente no estoy aquí</h1>,
//         //     document.getElementById('modal')
//         // )}
//     );
// }

// export default Modal; 

import React from 'react';
import ReactDOM from 'react-dom';

import './styles/Modal.css';

function Modal(props) {
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <button onClick={props.onClose} className="Modal__close-button">
          X
        </button>

        {props.children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;