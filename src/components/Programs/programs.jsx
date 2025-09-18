import './programs.css'
import program_1 from '../../assets/person.jpeg'
import program_2 from '../../assets/internship.jpeg'
import program_3 from '../../assets/youthprograms.jpeg'
// TODO: Fix icon imports, set up font awesome kit and connect to hosted site
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

const Programs = () => {
    return (
    <>
        <div className="programs">
            <div className="program">
                <img src={program_1} alt="programs at church" /> 
                <div className="caption">
                    <i class="fas fa-user-tie"></i>
                    <p>Internship opportunities</p>
                </div>
            </div> 
            <div className="program">
                <img src={program_2} alt="programs at church" /> 
                <div className="caption">
                    {/* <FontAwesomeIcon icon={byPrefixAndName.fas['cross']} /> */}
                    <p>Confirmation Classes</p>
                </div>
            </div>  
                <div className="program">
                <img src={program_3} alt="programs at church" /> 
                <div className="caption">
                    <i class="fas fa-users"></i>
                    <p>Youth Programs</p>
                </div>
            </div>  
        </div>
     </>
    )
}

export default Programs