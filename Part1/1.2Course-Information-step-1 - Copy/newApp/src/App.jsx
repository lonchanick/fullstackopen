import {useState} from 'react'
import Button from './Button'

const SingleStatistic = ({text, value})=> <p>{text}: {value}</p>

const Statistics = ({moreStatistics})=>{
  const totalStatistics = moreStatistics.length;
  
  if(totalStatistics===0)
    return (<div>No feedback given!</div>)

  const getAverage = () => moreStatistics.reduce((sum,num)=>sum+num,0)/totalStatistics;
  
  const getPositive = () => 
    (moreStatistics.reduce((acc, num) => num>0 ? acc + num : acc , 0)/totalStatistics)*100;
  
  return(
    <div>
      <SingleStatistic text = 'FeedBack' value = {totalStatistics} />
      <SingleStatistic text = 'Average' value = {getAverage()} />
      <SingleStatistic text = 'Positive' value = {getPositive()} />
    </div>
  )
}


const App = () =>{
  const [moreStatistics, setStatistics] = useState([]);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const evHandSetGood = (val)=> {
    setGood(val);
    setStatistics(moreStatistics.concat(1));
  }
  const evHandSetNeutral = (val)=> {
    setNeutral(val);
    setStatistics(moreStatistics.concat(0));

  }
  const evHandSetBad = (val)=> {
    setBad(val);
    setStatistics(moreStatistics.concat(-1));
  }


  return(
    <>
    <code>Exercise 1.6</code>
    <h1>Give feedback</h1>
    <Button fnReference={()=>evHandSetGood(good +1)} text = 'Good'/>
    <Button fnReference={()=>evHandSetNeutral(neutral +1)} text = 'Neutral'/>
    <Button fnReference={()=>evHandSetBad(bad +1)} text = 'Bad'/>
    <h2>Statistics</h2>
    <p><span>Good: </span><span>{good}</span></p>
    <p><span>Neutral: </span><span>{neutral}</span></p>
    <p><span>Bad: </span><span>{bad}</span></p>
    <code>More statistics:</code>
    <Statistics moreStatistics = {moreStatistics} />
    </>
  )
}

export default App