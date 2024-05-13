import EachProjectMini from "./EachProjectMini"
import useAppContext from "../../components/useAppContext"

function UserProjects (){
    const {userProfile} = useAppContext()
    const projects = userProfile.data.projects;
    return (
        <div className="project-section">
            <h2 className="ps-h2">Projects</h2>
            <div className="eachProject">
                { projects.length > 0 ? projects.map(project => (
                    <EachProjectMini key={project.id} project={project} />
                )) : "No projects yet"}
            </div>
        </div>
    )
}
export default UserProjects