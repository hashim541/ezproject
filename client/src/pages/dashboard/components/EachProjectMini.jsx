import { Link } from "react-router-dom"
import FormatedPara from "./FormatedPara"
import EachFollower from "./Each Follower"

function EachProjectMini({project}){
    return(
        <div className="each-project">
            <img className="ep-img" src={project.preview_url} alt="" />
            <EachFollower key={project.id} eachFollower={project.user}/>
            <div className="ep-content">
                <h3 className="ep-title">
                    <Link to={'/home/projects/'+project.id}>
                    {project.title} 
                    </Link>
                </h3>
                
                
                <div className="l-r">
                    <p className={"ep-diff "+project.difficulty}>{project.difficulty}</p>
                </div>
                <div className="plangs">
                    {project.languages.map((lang,index) => (
                        index < 5 &&
                        <div className="ep-lang">
                            <div className="ep-langs">
                                <img src={lang.url} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
                {/* <FormatedPara class_name={"ep-desc"} para={project.desc.slice(0,100)+'...'}/> */}
                <p className="ep-desc">{project.desc.slice(0,147)+'...'}</p>
                {/* <div className="ep-btns">
                    <a href={project.live_site_url} target="_blank">
                        <button className="p-btn e-btn live" disabled={project.live_site_url.length == 0 ? true : false}>Live Site</button>
                    </a>
                    <a href={project.github_repo_url} target="_blank">
                        <button className="p-btn e-btn git" disabled={project.github_repo_url.length == 0 ? true : false}>Github Repo</button>
                    </a>
                </div> */}
            </div>
        </div>
    )
}
export default EachProjectMini