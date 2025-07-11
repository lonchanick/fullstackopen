 
const Content = ({thisShouldBeTheNameOfTheParamRecivedInTheComponent}) => 
{
    return thisShouldBeTheNameOfTheParamRecivedInTheComponent
    .map(el => <p key={el.key}>{el.courseName} {el.exercises}</p>);
}

 

export default Content;
