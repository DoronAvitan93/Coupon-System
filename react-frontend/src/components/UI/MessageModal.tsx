
import Button from './Button';
// import classes from './MessageModal.module.css';
import ReactDOM from 'react-dom';
import './MessageModal.css'


const MessageModal = (props) => {
  return (
    <div>
      {
        ReactDOM.createPortal(
          <div className='backdrop' onClick={props.onConfirm} />,
          document.getElementById("backdrop-root")
        )
      }
      {
        ReactDOM.createPortal(
          <div className='modal'>
            <header className='header'>
              <h2>{props.title}</h2>
            </header>
            <div className='content'>
              <h3>{props.message}</h3>
              <h2>{props.messageToken}</h2>
            </div>
            <footer className='actions'>
              <Button onClick={props.onConfirm}>Ok</Button>
            </footer>
          </div>,
          document.getElementById("overlay-root")
        )
      }
    </div>
  );
};

export default MessageModal;
