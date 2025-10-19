
const Notification = ({message, typeOfNotification})=>{
    if(message=== null)
        return null;

    // console.log("type of notification: ", typeOfNotification)
    const element = <div className={typeOfNotification}> {message} </div>; 
    
    return(element);
}

 

export default Notification


