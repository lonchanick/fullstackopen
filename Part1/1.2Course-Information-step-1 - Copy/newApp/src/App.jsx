import {useState} from 'react'
import Button from './Button'

const SingleStatistic = ({text, value})=> <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({moreStatistics,good,neutral,bad})=>{
  const totalStatistics = moreStatistics.length;
  
  if(totalStatistics===0)
    return (<div>No feedback given!</div>)

  const getAverage = () => moreStatistics.reduce((sum,num)=>sum+num,0)/totalStatistics;
  
  const getPositive = () => 
    (moreStatistics.reduce((acc, num) => num>0 ? acc + num : acc , 0)/totalStatistics)*100;
  
  return(
  <table>
    <tbody>
      <SingleStatistic text = 'Good' value = {good} />
      <SingleStatistic text = 'Neutral' value = {neutral} />
      <SingleStatistic text = 'Bad' value = {bad} />
      <SingleStatistic text = 'FeedBack' value = {totalStatistics} />
      <SingleStatistic text = 'Average' value = {getAverage()} />
      <SingleStatistic text = 'Positive' value = {getPositive()} />
    </tbody>
      
  </table>
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
    <Statistics moreStatistics = {moreStatistics} good ={good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App