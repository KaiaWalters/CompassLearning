import './title.css';

const Title = ({title, subtitle}) => {
    return (
        <div className="title">
            <h3>{subtitle}</h3>
            <h2>{title}</h2> 
        </div>
    );
}

export default Title;