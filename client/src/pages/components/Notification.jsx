import useAppContext from "./useAppContext"
import closeSvg from '../../../public/svg/close.svg'

function Notification(){
    const {notification} = useAppContext()
    return(
        <div className="notify">
            {notification.map((data,i)=>(
                <SingleNotification key={i} data={data} i={i}/>
            ))}
        </div>
    )
}
export default Notification

function SingleNotification({data,i}){
    const {handelNotification} = useAppContext()
    return(
        <div className="notification">
            <div className={data.status ? 'good status':'bad status'}></div>
            <div className="content">
                <img className="notify-close" src={closeSvg} alt="close svg" onClick={()=> handelNotification(data.message)}/>
                <p className="message">{data.message}</p>
            </div>
        </div>
    )
}