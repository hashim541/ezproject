import close from '../../../../public/svg/close.svg'
import useAppContext from '../../components/useAppContext'

function Dialog({project,setDialog}){
    const {deleteProject} = useAppContext()
    return(
        <div className="dialog">
            <div className="layer"></div>
            <div className="box">
                <img src={close} alt="" onClick={()=>setDialog(false)}/>
                <h3>Are you sure,you want to delete this project</h3>
                <p>{project.title}</p>
                <div className="btns2">
                    <button className="cancel p-btn " onClick={()=>setDialog(false)}>Cancel</button>
                    <button className="p-btn delete live" onClick={()=>deleteProject(project.id)}>Delete</button>
                </div>
            </div>
        </div>
    )

}
export default Dialog