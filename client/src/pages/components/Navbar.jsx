import logoImg from '../../../public/logo.png'
import menuSvg from '../../../public/svg/menu.svg'
import closeSvg from '../../../public/svg/close.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useAppContext from './useAppContext'

function Navbar (){
    const [menu,setMenu] = useState(false)
    const {nav,handelLogout,User,userID} = useAppContext()
    return(
        <nav>
            <div className="logo">
                <img className='logo-img' src={logoImg} alt="EZProject logo" />
                <h2>EZProject</h2>
            </div>
            <div className={menu ? "layer vis":"layer"}></div>
            <div className={menu ? "hide open" : "hide"}>
                <button className="close p-btn" onClick={()=>setMenu(false)}>
                    <img src={closeSvg} alt="close svg" />
                </button>
                {nav == 'logout' && 
                    <div className={nav != 'logout' ? 'dis-none ': 'paths'}>
                        <Link to='/home' onClick={()=>setMenu(false)}>Home</Link>
                        <Link to={'/home/profile/'+userID} onClick={()=>setMenu(false)}>Profile</Link>
                        <Link to='/home/createProject' onClick={()=>setMenu(false)}>Create Project</Link>
                        <Link to={'/home/followers/'+userID} onClick={()=>setMenu(false)}>Followers</Link>
                        <Link to='/home/editProfile' onClick={()=>setMenu(false)}>Edit Profile</Link>
                        
                    </div>
                }
                <div className="auth-paths">
                    {nav != 'login' && nav != 'logout' ? <Link to='/login' onClick={()=>setMenu(false)}><button className='p-btn login'>Login</button></Link>:null}
                    {nav != 'register' && nav != 'logout' ? <Link to='/register' onClick={()=>setMenu(false)}><button className='p-btn register'>Register</button></Link>:null}
                    {nav == 'logout' && <button onClick={()=>handelLogout()} className='p-btn register'>Logout</button>}
                </div>
            </div>

            <button className="menu p-btn" onClick={()=>setMenu(true)}>
                <img  src={menuSvg} alt="menu svg" />
            </button>
        </nav>
    )
}
export default Navbar