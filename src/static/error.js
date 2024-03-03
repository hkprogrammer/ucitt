import { useNavigate } from "react-router-dom";
import "./error.css";
/**
 * returns page error html file and return back to home after 5 seconds
 * @return {HTMLElement} page error
 */
const PageError = ()=>{
    const navigate = useNavigate();
    
    setTimeout(()=>{
        navigate("/");
    },5000);
    return(
        <div className="errorMessage">Page Load Error, revisiting main page in 5 seconds.</div>
    )
}

export {PageError};