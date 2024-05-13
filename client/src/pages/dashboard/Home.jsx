import { useEffect, useState } from "react"
import useAppContext from "../components/useAppContext"
import EachProjectMini from "./components/EachProjectMini"
import EachFollower from "./components/Each Follower"
function Home(){
    const {recomended,getHomeData,onSearch,allSkills} = useAppContext()
    const [search,setSearch] = useState({
        type:'',
        result:[]
    })
    const [searchType,setSearchType] = useState('')
    function handelSearchTypeChange(e){
        const {value } = e.target
        console.log(value)
        setSearchType(value)
    } 
    useEffect(()=>{
        getHomeData()
    },[])
    return(
        <div className="home-section">
            <div className="search-bar">
                <form className="search-form" onSubmit={(e)=>onSearch(e,setSearch)}>
                    <div className="inps s-select">
                        <select name="type" id="" className="inp s-select" onChange={(e)=>handelSearchTypeChange(e)}>
                            <option disabled>Select</option>
                            <option value="user_name">User name</option>
                            <option value="user_skill">User skill</option>
                            <option value="project_name">Project name</option>
                            <option value="project_difficulty">Project difficulty</option>
                            <option value="project_tech_stack">Project tech stack</option>
                        </select>
                    </div>
                    <div className="search-bar2">
                        { searchType != 'user_skill' && searchType != 'project_tech_stack' && searchType != 'project_difficulty' ?  
                            <div className="inps">
                                <input type="search" name="search" id="search" required className="inp" autoComplete="off"/>
                            </div> 
                            :
                            searchType == 'project_difficulty' ?
                            <select name="search" className="inp" id="search">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advance">Advance</option>
                            </select>
                             :
                            <select name="search" className="inp" id="search">
                                <option disabled>Select here</option>
                                {allSkills.map(skill =>(
                                    <option value={skill.id}>{skill.name}</option>
                                ))}
                            </select>
                         }
                        <input type="submit" value='Search' className="p-btn e-btn"/>
                    </div>
                </form>
            </div>
            <div className="search-result">
                {search.type.length > 0 && search.type == 'user' ? <UserList user={search.result}/> :null}
                {search.type.length > 0 && search.type == 'project' ? <ProjectList projects={search.result}/>:null}
                {search.type.length != 0 && search.result.length == 0 && <p>Noting found</p> }
            </div>
            <div className="recomended">
                <h2>Recomended Users</h2>
                <div className="user_list">
                    {
                        recomended.user.map(eachUser =>(
                            <EachFollower key={eachUser.id} eachFollower={eachUser} />
                        ))
                    }
                </div>
                <h2>Latest Projects</h2>
                <div className="project-list">
                { recomended.project.map((project)=>(
                    <EachProjectMini key={project.id} project={project} />    
                ))}
                </div>
            </div>
        </div>
    )
}
export default Home

function UserList({user}){
    return (
        <div className="user_list">
            {
                user.map(eachUser =>(
                    <EachFollower key={eachUser.id} eachFollower={eachUser} />
                ))
            }
        </div>
    )
}
function ProjectList({projects}){
    return(
        <div className="project-list">
            { projects.map((project)=>(
                <EachProjectMini key={project.id} project={project} />    
            ))}
        </div>
    )
}