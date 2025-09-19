import {Total} from '../App'

const Course = ({course})=>{
    // console.log(course)
    const {id,name,parts} = course
    return(
        <div>
            <h1 key={id}>{name}</h1>
            {parts.map(el => <p key={el.id}>{el.name} {el.exercises}</p>)}
            <Total course = {parts} />
        </div>
    )
}

export default Course