import { useParams } from "react-router-dom"
import useAppContext from "../components/useAppContext"
import deleteSvg from '../../../public/svg/close.svg'
import Dialog from "./components/Dialog"
import { useState } from "react"

function EditProject(){
    const {projectId} = useParams()
    const {project,setProject,allSkills,convertFormData,updateProjectDetails} = useAppContext()
    const [dialog,setDialog] = useState(false)
    const pro_lang_List = project.languages.map(eachLang => eachLang.name)
    function handelInputChange(e){
        const {name,value} = e.target
        const copyProject = {...project}
        copyProject.data[name] = value
        setProject(copyProject)
    }
    function removeSkill(proLangId){
        const copyProject = {...project}
        copyProject.languages = copyProject.languages.filter(eachLang => eachLang.id != proLangId)
        setProject(copyProject)
    }
    function addSkillSubmit(e){
        e.preventDefault()
        const formData = convertFormData(e.target)
        const result = allSkills.find(skill => skill.id == Number(formData.prolang))
        const copyProject = {...project}
        copyProject.languages.push(result)
        setProject(copyProject)
    }
    function addNewImage(){
        const copyProject = {...project}
        const newImageCarousel = {
            project_id:project.data.id,
            image_url:'',
            image_name:''
        }
        copyProject.ImageCarousel.push(newImageCarousel)
        setProject(copyProject)
    }
    function imageCaroucelChange(e,index){
        const {name,value} = e.target
        const copyProject = {...project}
        copyProject.ImageCarousel[index][name]=value
        setProject(copyProject)
    }
    function removeImageCarousel(index){
        const copyProject = {...project}
        copyProject.ImageCarousel=copyProject.ImageCarousel.filter((img_car,i)=>i!=index)
        setProject(copyProject)
    }
    return(
        <div className="edit-project-section">

            <h2>Edit {project.data.title}</h2>
            <form className="edp-userform" >
                <div className="inps">
                    <label htmlFor="">Title</label>
                    <input type="text" name="title" className="inp" value={project.data.title} onChange={(e)=>handelInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Preview image url</label>
                    <input type="text" name="preview_url" className="inp" value={project.data.preview_url} onChange={(e)=>handelInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Project description</label>
                    <textarea name="desc" className="inp" value={project.data.desc}  onChange={(e)=>handelInputChange(e)} ></textarea>
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
                    <input type="text" name="live_site_url" className="inp" value={project.data.live_site_url}  onChange={(e)=>handelInputChange(e)} />
                </div>
                <div className="inps">
                    <label htmlFor="">Github Repo url</label>
                    <input type="text" name="github_repo_url" className="inp" value={project.data.github_repo_url}  onChange={(e)=>handelInputChange(e)} />
                </div>
                
            </form>
            <div className="pro-lang-used inps">
                <label>Tech Stack Used</label>
                <div className="pro-lang-list">
                    {project.languages.map(eachProLang =>(
                        <div className="pro_lang">{eachProLang.name}
                            <img className="prolang-close" onClick={()=>removeSkill(eachProLang.id)} src={deleteSvg} alt="" />
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
                    <button type="submit " className="p-btn e-btn add">Add</button> 
                </form>
            </div>
            <div className="image-carousel">
                <h3> Image Carousel</h3>
                <div className="each-ic">

                {project.ImageCarousel.map((eachImage,index) => (
                    <form >
                        <div className="inps">
                            <label htmlFor="">{eachImage.image_name.length != 0 ?eachImage.image_name:'None'}</label>
                            <input type="text" className="inp" name="image_url" value={eachImage.image_url} onChange={(e)=>imageCaroucelChange(e,index)}/>
                            <input type="text" name="image_name" className="inp" value={eachImage.image_name} onChange={(e)=>imageCaroucelChange(e,index)} />
                        </div>
                        <button type="button" className="p-btn add e-btn" onClick={()=>removeImageCarousel(index)}>Remove</button>
                    </form>
                ))}
                </div>
                <button className="p-btn add e-btn" onClick={()=> addNewImage()}>Add Image</button>
            </div>
            <button type="button" className="p-btn submit" onClick={(e)=>updateProjectDetails(e)}> Update Project</button>
            <button type="button" className="p-btn submit live" onClick={()=>setDialog(true)} >DELETE THIS PROJECT</button>

            {dialog &&<Dialog project = {project.data} setDialog={setDialog}/>}
        </div>
    )
}
export default EditProject