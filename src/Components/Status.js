import "./Status.css";

const Green = (props)=>{
    const text = props.text;
    return(
        <div className="green">
            {text}
        </div>
    )   
}

const Red = (props)=>{
    const text = props.text;
    return(
        <div className="red">
            {text}
        </div>
    )

}
export {Green,Red};