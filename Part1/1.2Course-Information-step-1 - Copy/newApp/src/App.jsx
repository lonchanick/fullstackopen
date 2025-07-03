
import {useState} from 'react'
import History from './HistoryClicks';
import Button from './Button'

const App = () =>{
  const [total, setTotal] = useState(0);
  const [clicks, logClick] = useState([]);
  const [leftCounter, setLeft] = useState(0);
  const [rightCounter, setRight] = useState(0);

  const updateLeft = () => {
    logClick(clicks.concat('L'));
    const total = leftCounter + 1;
    setLeft(total);
    setTotal(total+rightCounter);
  }

  const updateRight = () => {
    logClick(clicks.concat('R'));
    const total = rightCounter + 1;
    setRight(total);
    setTotal(total+leftCounter);
  }

  return(
    <>
      <h1>My App</h1>
      <History clicks = {clicks}/>
      <p>Total: {total}</p>
      {leftCounter}<span>   </span>
      <Button fnReference={updateLeft} text='left' /><span>__</span>
      <Button fnReference={updateRight} text='right' /><span>__</span>
      {rightCounter}
    </>
  );
}

export default App