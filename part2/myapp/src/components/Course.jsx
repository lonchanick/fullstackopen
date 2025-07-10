
const Course = ({course})=>{ 
    // console.log(course)
    const {id,name,parts} = course;
    return(
        <div>
            <span><code>exercise 2.1</code></span>
            <h1 key={id}>{name}</h1>
            {parts.map(el => <p key={el.id}>{el.name} {el.exercises}</p>)}
        </div>
    )
}

export default Course