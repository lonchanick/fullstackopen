
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const header = 'Half Stack application development'; 

  const part1 = {
    name: 'Fundamentals of React',
    exercise: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercise: 7
  }

  const part3 = {
    name: 'State of a component',
    exercise: 14
  }

  const total = 31
  
  return (
    <div>
      <code>Wellcome to the exercise 1.3</code>
      <Header header = {header}/> 
      <Content param = {part1} />
      <Content param = {part2} />
      <Content param = {part3}/>
      <Total total = {total}/>
    </div>
  )
}

export default App