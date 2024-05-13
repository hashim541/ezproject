import { useParams } from "react-router-dom"
import useAppContext from "../components/useAppContext"
import { useEffect, useState } from "react"
import EachFollower from "./components/Each Follower"


function Followers(){
    const {userId} = useParams()
    const {userID,followers,getfollowerDetails}= useAppContext()
    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        getfollowerDetails(Number(userId),setLoading)
    },[])

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }
    return(
        <div className="follower-section">
            <h2>{userID == userId ? 'Your ' : followers.user.username+"'s "}Followers <span className="small">{followers.followers.length}</span></h2>
            <div className="follower-list">
                {   followers.followers.length > 0 ?
                    followers.followers.map(eachFollower => (
                        <EachFollower key={eachFollower.id} eachFollower={eachFollower} />
                    ))
                    :
                    'You have 0 followers'
                }
            </div>
            <h2>{userID == userId ? 'Your ' : followers.user.username+"'s "}Followings <span className="small">{followers.following.length}</span></h2>
            <div className="follower-list">
                {   followers.following.length > 0 ?
                    followers.following.map(eachFollower => (
                        <EachFollower key={eachFollower.id} eachFollower={eachFollower} />
                    ))
                    :
                    'You have 0 following'
                }
            </div>
        </div>
    )
}
export default Followers