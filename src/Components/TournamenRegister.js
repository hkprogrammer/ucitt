import "./TournamenRegister.css";

const TournamentRegister = (props)=>{

    const requiredFields = props.requiredFields;
    const optionalFields = props.optionalFields;


    console.log(requiredFields);
    return (
        <div>
            <form>
                {
                    Object.keys(requiredFields).map((key)=>{
                        return (
                            <div>
                                <span className="">{key}: &nbsp;</span>
                                <input type={requiredFields[key]}  required className="register-input"></input>
                            </div> 
                            
                        )
                    })
                    
                }   
                {
                    Object.keys(optionalFields).map((key)=>{
                        return (
                            <div>
                                <span className="">{key}: &nbsp;</span>
                                <input type={optionalFields[key]}  className="register-input"></input>
                            </div>
                        )
                    })
                }
            </form>
        </div>
        

    )


}

export default TournamentRegister;