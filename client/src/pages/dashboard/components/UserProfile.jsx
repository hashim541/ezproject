import useAppContext from "../../components/useAppContext"
import FormatedPara from "./FormatedPara";
import { Link } from "react-router-dom";

function UserProfile(){
    const { userProfile,User,editFollower } = useAppContext()
    const user = userProfile.data.user;
    console.log(user)
    return(
        <div className="profile-page">
            <div className="profile-section">
                <div className="p-i-e">
                    <img className="p-img" src={user.profile_url.length > 0 ? user.profile_url : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'} alt="" />
                    
                </div>
                <div className="profile-details">
                    <div className="pd-d">
                        <div className="pd-n-f">
                            <h2 className="pd-name">{user.username}</h2>
                            {User.data.user.id != user.id && <button className="p-btn  follow" onClick={()=>editFollower(user.id)}>{user.userFollowing ? 'Following':'Follow'}</button>}
                        </div>
                        {user.about_short.length != 0 ? <FormatedPara key={user.about_short} para={user.about_short} class_name={'pd-short'}/> : <p>Hey, I am new to EZPRoject</p> }
                        
                    </div>
                    <div className="pd-s">
                        <div className="pd-count">
                            <h3>{user.project_count != undefined ? user.project_count : 0}</h3>
                            <p>Projects</p>
                        </div>
                        <div className="pd-count follower_count">
                            <h3>{user.followers_count != undefined ? user.followers_count : 0}</h3>
                            <Link to={'/home/followers/'+user.id}><p>Followers</p></Link>
                        </div>
                        <div className="pd-count">
                            <h3>{user.following_count != undefined ? user.following_count : 0}</h3>
                            <p>Following</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="external-btns">
                <a href={user.github_url} target="_blank"><button className="e-ghub e-btn git p-btn" disabled={user.github_url.length == 0 ? true : false}>Github</button></a>
                <a href={user.linkedin_url} target="_blank"><button className="e-link e-btn in p-btn" disabled={user.linkedin_url.length == 0 ? true : false}>Linked in</button></a>
            </div>
        </div>
    )
}
export default UserProfile