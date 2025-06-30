
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {

  const elPatron = {
  header: 'Half Stack application development',

  parts : [
    {courseName: 'Fundamentals of React', exercises: 10, key: 1},
    {courseName: 'Using props to pass data', exercises: 7, key: 2},
    {courseName: 'State of a component', exercises: 14, key: 3}],

  total: 31
  }
  
  
  return (
    <div>
      <code>Wellcome to the exercise 1.5</code>
      <Header header = {elPatron.header}/> 
      <Content thisShouldBeTheNameOfTheParamRecivedInTheComponent = {elPatron.parts} /> 
      <Total total = {elPatron.total}/>
    </div>
  )
}

export default App