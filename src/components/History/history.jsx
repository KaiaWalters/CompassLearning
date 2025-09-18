import history from './history.js'
import history_1 from '../../assets/StJames_AllanRCrite_1940.png'
import './history.css'

const History = () => {
    return (
        <>
            <div className="history">

                <div className="history-left">
                    <img className="altimage" src={history_1} alt="video of st john st james" /> 
                </div>
                 <div className="history-right">
                        <h3>OUR HISTORY</h3>
                        <h2>The Origins of St.John St.James</h2>
                        <p>{history[0].event}</p>
                        <button className="btn">Learn More</button>
                </div> 
            </div>
        </>
    )
}

export default History