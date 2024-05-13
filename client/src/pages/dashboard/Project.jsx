import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import useAppContext from "../components/useAppContext";
import FormatedPara from "./components/FormatedPara";
import ImageCarousel from "./components/ImageCarousel";
import likeSvg from '../../../public/svg/like.svg'
import dLikeSvg from '../../../public/svg/darkLike.svg'
import EachFollower from "./components/Each Follower";

function Project(){
    const {project,getProjectDetails,addLikeToProject,userID,} = useAppContext()
    const [loading,setLoading] = useState(true)
    const {projectId} = useParams()
    useEffect(()=>{
        getProjectDetails(projectId,setLoading)
    },[])
    if(loading){
        return (
            <h1>Loading ...</h1>
        )
    }
    return(
        <div className="project-page">
            <h2 className="ps-title">{project.data.title}</h2>
            {project.ImageCarousel.length > 0 && <ImageCarousel carouselData={project.ImageCarousel} /> }   
            <EachFollower key={project.data.title} eachFollower={project.data.user}/>
            <div className="p-p-btns">
                <a href={project.data.live_site_url} target="_blank">
                    <button className="p-btn e-btn live">Live Site</button>
                </a>
                <a href={project.data.github_repo_url} target="_blank">
                    <button className="p-btn e-btn git">Github Repository</button>
                </a>
                <div className="p-likes" onClick={()=>addLikeToProject(project.data.id)}>
                    <img src={ project.data.userLikedThisProject ? dLikeSvg : likeSvg} alt="" />
                    <p>{project.data.like_count}</p>
                </div>
            </div>
            
            <div className={"ep-diff ps-diff "+project.data.difficulty}>{project.data.difficulty}</div>

            <div className="desc-tech">    
                <div className="p-desc">
                    <h3>Project Description</h3>
                {project.data.desc.length > 0 ? <FormatedPara class_name={"pd-short"} para={project.data.desc}/> : "No description"}
                </div>

                <div className="tech-stack">
                    <h3>Tech Stack</h3>
                    <div className="skills">
                        {project.languages.map(eachLang => (
                            <div className="eachSkill">
                                <div className="img img3">
                                    <img className="es-logo" src={eachLang.url} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {userID == project.data.user_id && <Link to={'/home/editProject/'+project.data.id}>
                <button className="p-btn e-btn"> Edit Project </button>
            </Link>}
        </div>
    )
}

export default Project