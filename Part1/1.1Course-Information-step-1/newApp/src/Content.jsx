const Content = ({list}) => list.map(el => <p>{el.courseName} {el.exercises}</p>);

export default Content;
