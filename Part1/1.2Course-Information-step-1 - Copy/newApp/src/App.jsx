
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const header = 'Half Stack application development'; 
  
  const total = 31
  
  return (
    <div>
      <Header header = {header}/> 
      <Content list />
      <Total total = {total}/>
    </div>
  )
}

export default App