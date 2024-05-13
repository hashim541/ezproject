import { useState } from "react"
import useAppContext from "../components/useAppContext"
import deleteSvg from '../../../public/svg/close.svg'

function CreateProject(){
    const {userID,allSkills,convertFormData,handelCreateProject} = useAppContext()
    const [projectSchema,setProjectSchema] =useState({
        project:{
            user_id:userID,
            title:'',
            preview_url:'',
            desc:'',
            difficulty:'',
            live_site_url:'',
            github_repo_url:''
        },
        pro_lang:[]
    })
    const pro_lang_List = projectSchema.pro_lang.map(proLang => proLang.name)
    function handelInputChange(e){
        const {name,value} = e.target
        const updatedProjectSchema = {...projectSchema,project:{...projectSchema.project},pro_lang:[...projectSchema.pro_lang]}
        updatedProjectSchema.project[name]=value
        setProjectSchema(updatedProjectSchema)
    }
    function addSkillSubmit(e){
        e.preventDefault()
        const formData = convertFormData(e.target)
        const result = allSkills.find(skill => skill.id == formData.prolang)
        const copyProjectSchema = {...projectSchema}
        copyProjectSchema.pro_lang.push(result)
        setProjectSchema(copyProjectSchema)
    }
    function removeSkill(pro_lang){
        const result = pro_lang_List.filter(prolang => pro_lang.name == pro_lang)
        const copyProjectSchema = {...projectSchema}
        copyProjectSchema.pro_lang=result
        setProjectSchema(copyProjectSchema)
    }

    return (
        <div className="create-project-section">
            <h2>Create a new project</h2> 
            <form className="edp-userform" onSubmit={(e)=>handelCreateProject(e,projectSchema)}>
                <div className="inps">
                    <label htmlFor="">Title</label>
                    <input type="text" name="title" className="inp" value={projectSchema.project.title} onChange={(e)=>handelInputChange(e)} required/>
                </div>
                <div className="inps">
                    <label htmlFor="">Preview image url</label>
                    <input type="text" name="preview_url" className="inp" value={projectSchema.project.preview_url} onChange={(e)=>handelInputChange(e)} required/>
                </div>
                <div className="inps">
                    <label htmlFor="">Project description</label>
                    <textarea name="desc" className="inp" value={projectSchema.project.desc}  onChange={(e)=>handelInputChange(e)} required></textarea>
                </div>
                <div className="inps">
                    <label htmlFor="">Difficulty</label>
                    <select name="difficulty" onChange={(e)=>handelInputChange(e)} className="inp" id="">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advance">Advance</option>
                    </select>
                </div>
                <div className="inps">
                    <label htmlFor="">Live site url</label>
                    <input type="text" name="live_site_url" className="inp" value={projectSchema.project.live_site_url}  onChange={(e)=>handelInputChange(e)} required/>
                </div>
                <div className="inps">
                    <label htmlFor="">Github Repo url</label>
                    <input type="text" name="github_repo_url" className="inp" value={projectSchema.project.github_repo_url}  onChange={(e)=>handelInputChange(e)} required/>
                </div>
                
                    <input type="submit" value="Create Project" className="p-btn submit" />
            </form>
            <div className="pro-lang-used inps">
                <label>Tech Stack Used</label>
                <div className="pro-lang-list">
                    {pro_lang_List.map(eachProLang =>(
                        <div className="pro_lang">{eachProLang}
                            <img className="prolang-close" onClick={()=>removeSkill(eachProLang)} src={deleteSvg} alt="" />
                        </div>
                    ))}
                </div>
                <form className="edp-userform" onSubmit={(e)=>addSkillSubmit(e)}>
                    <select name="prolang" className="inp" id="">
                        <option  value='' disabled>Select</option>
                        {allSkills.map(eachProlangs => (
                            !pro_lang_List.includes(eachProlangs.name) &&
                            <option key={eachProlangs.id} value={eachProlangs.id}>{eachProlangs.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="p-btn add">Add</button> 
                </form>
            </div>
            
        </div>
    )
}

export default CreateProject