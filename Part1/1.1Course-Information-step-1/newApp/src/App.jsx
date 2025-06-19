
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const header = 'Half Stack application development';
  const content = [
    {courseName: 'Fundamentals of React', exercises: 10},
    {courseName: 'Using props to pass data', exercises: 7},
    {courseName: 'State of a component', exercises: 14}]
  
    const total = content.reduce((acc, obj)=> acc+obj.exercises, 0);
  
  return (
    <div>
      <Header header = {header}/> 
      <Content list = {content}/>
      <Total total = {total}/>
    </div>
  )
}

export default App