
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const header = 'Half Stack application development'; 

  const parts = [
    {courseName: 'Fundamentals of React', exercises: 10, key: 1},
    {courseName: 'Using props to pass data', exercises: 7, key: 2},
    {courseName: 'State of a component', exercises: 14, key: 3}]

  const total = 31
  
  return (
    <div>
      <code>Wellcome to the exercise 1.4</code>
      <Header header = {header}/> 
      <Content thisShouldBeTheNameOfTheParamRecivedInTheComponent = {parts} /> 
      <Total total = {total}/>
    </div>
  )
}

export default App