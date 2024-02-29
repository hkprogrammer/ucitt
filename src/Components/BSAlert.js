import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './BSAlert.css'




function AlertDismissible({show:initialShow = false,message = "",type = "light"}) {
  // const [_show, setShow] = useState(show || false);
  // const [_message, _setMessage] = useState(message || "");
  // const [_type, _setType] = useState(type || "light");

  // var _show = show;
  const [_plc, _splc] = useState(0);
  const [_show, _setShow] = useState(initialShow);

  useEffect(()=>{
    _setShow(initialShow)
  }, [initialShow])  
  return (
    <Alert className='Alert' show={_show} onClose={()=>_setShow(false)} variant={type} dismissible>
        {message}
    </Alert>
  );
}

export default AlertDismissible;