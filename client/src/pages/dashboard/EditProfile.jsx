import { useState } from "react"
import useAppContext from "../components/useAppContext"

function EditProfile(){
    const {User,setUser,updateUserProfile,handelSkillSubmit,deleteSkill,editSkill,allSkills,userProfile} = useAppContext()
    if (!User.data.user) {
        return <h1>Loading...</h1>;
    }
    const user = User.data.user
    const [skills,setSkills] = useState(userProfile.data.skills)
    const skillsList = skills.map(skills => skills.name)

    function handleInputChange(e) {
        const { name, value } = e.target;
        const updatedUser  = { ...User, data: { ...User.data, user: { ...User.data.user, [name]: value } } }
        setUser(updatedUser)
    }
    function handelSkillChange(e,i){
        const {name,value} = e.target
        const updatedSkills = [...skills];
        updatedSkills[i][name] = value;
        setSkills(updatedSkills); 
    }
    return(
        <div className="edit-profile">
            <h2>Edit your profile</h2>
            <form className="edp-userform" onSubmit={(e)=>updateUserProfile(e)}>
                <div className="inps">
                    <label htmlFor="">Name</label>
                    <input type="text" className="inp inp2" name="username" value={user.username} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Profile Image Url</label>
                    <input type="text" className="inp inp2" name="profile_url" value={user.profile_url} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Short About</label>
                    <textarea name="about_short" className="inp inp2" value={user.about_short} onChange={(e)=>handleInputChange(e)}></textarea>
                </div>
                <div className="inps">
                    <label htmlFor="">Github Profile Url</label>
                    <input type="text" className="inp inp2" name="github_url" value={user.github_url} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Linkedin Profile Url</label>
                    <input type="text" className="inp inp2" name="linkedin_url" value={user.linkedin_url} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">About Me</label>
                    <textarea name="about" className="inp inp2" value={user.about} onChange={(e)=>handleInputChange(e)}></textarea>
                </div>
                <button type="submit" className="p-btn submit">Submit</button>
            </form>
            <div className="edp-userform"  >
                <h2 className="edp-h2">Skills</h2>
                {skills.map( (skill,i) => (
                    <form className="inps">
                        <label>{skill.name}</label>
                        <input type="text" name='desc' className="inp inp2" value={skill.desc} onChange={(e)=>handelSkillChange(e,i)} placeholder="Little description about this skill"/>
                        <input type="text" name='certification_url' className="inp inp2"  onChange={(e)=>handelSkillChange(e,i)} value={skill.certification_url} placeholder="Certifiction Url"/>
                        <div className="skbtns">
                            <button type="button" className="p-btn sk-sub e-btn" onClick={(e)=>editSkill(e,skills,setSkills,i)}>Update</button>
                            <button type="button" className="p-btn sk-sub e-btn" onClick={(e)=>deleteSkill(e,skills,setSkills,i)}>Delete</button>
                        </div>
                    </form>
                ))}
            </div>
            <form action="" className="edp-userform" onSubmit={(e)=>handelSkillSubmit(e,skills,setSkills)}>
            <h3>Add new skill</h3>
                <select name="skill_id" className="inp" id="">
                    <option disabled>Select here</option>
                    {allSkills.map(skill =>(
                        !skillsList.includes(skill.name) ? 
                            <option value={skill.id}>{skill.name}</option>
                        : null
                    ))}
                </select>
                <button type="submit" className="p-btn sk-sub e-btn">Add Skill</button>
            </form>
        </div>
    )
}
export default EditProfile