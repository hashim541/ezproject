import useAppContext from "../../components/useAppContext"
import EachSkill from "./EachSkill"
import { Link } from "react-router-dom"
import FormatedPara from "./FormatedPara"

function AboutSkills(){
    const {userProfile,User} = useAppContext()
    const user = userProfile.data.user
    const skills = userProfile.data.skills
    return(
        <>
            <div className="about-me">
                <h2 className="am-title">About Me</h2>
               {user.about.length != 0 ?
                <FormatedPara key={user.about} para={user.about} class_name={'am-p'}/>:
                <p className="am-p">About me is empty </p>}
            </div>
            <div className="skill-section">
                <h2 className="s-title">Skills</h2>
                <div className="skills">
                    {skills.length != 0 ? skills.map(skill => (
                        <EachSkill key={skill.id} skill={skill} />
                    )):
                    "Add some skills"
                    }
                    {User.data.user.id == user.id && <Link to='/home/editProfile'><button className="p-btn add-skill">+</button></Link>}
                </div>
            </div>
        </>
    )
}

export default AboutSkills