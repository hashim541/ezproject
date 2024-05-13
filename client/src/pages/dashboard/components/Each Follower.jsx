import { Link } from "react-router-dom"

function EachFollower({eachFollower}){
    return(
        <div className="each-follower">
            <img src={eachFollower.profile_url.length>0 ?eachFollower.profile_url : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg' } alt="" className="ef-pimg" />

            <div className="ef-details">
                <Link to={'/home/profile/'+eachFollower.id}>
                    <h3>{eachFollower.username}</h3>
                </Link>
                <p>{ eachFollower.about_short != undefined && eachFollower.about_short.length > 0 && eachFollower.about_short.slice(0,50)+'...'}</p>
            </div>

        </div>
    )
}
export default EachFollower