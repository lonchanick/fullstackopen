const History  = (param)=>{
    if(param.clicks.length === 0)
    {
        return (<div> the app is used by pressing the buttons </div>);
    }
        

    return( <p>{param.clicks.join('-')}</p>)
}

export default History