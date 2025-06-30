import Part1 from './ContentComponents/part1'
import Part2 from './ContentComponents/part2'
import Part3 from './ContentComponents/part3'

const Content = ({param}) =>{
    return(
        <p>{param.name} {param.exercise}</p>
    )
}

export default Content;
