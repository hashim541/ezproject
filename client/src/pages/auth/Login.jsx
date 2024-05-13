import useAppContext from "../components/useAppContext"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import logo from '../../../public/logo.png'

function Login(){
    const {setNav,handelUserAuthSubmit} = useAppContext();

    useEffect(()=>{
        setNav('login')
    },[]);

    return(
        <div className="auth">
            <img className="logo-img" src={logo} alt="" />
            <h1 className="auth-h1">Login To EZPROJECT</h1>
            <form className="auth-form" onSubmit={(e)=>handelUserAuthSubmit(e,'login')}>
                <div className="inps">
                    <label htmlFor="">Email</label>
                    <input type="email" className="inp" id="email" name="email" required/>
                </div>
                <div className="inps">
                    <label htmlFor="">Password</label>
                    <input type="password" className="inp" id="password" name="password"  required min={6} />
                </div>
                <div className="inps">
                    <input className="p-btn login auth-btn" type="submit" value='Login' /> 
                </div>
                
            </form>
            <div className="auth-option">
                <p>New to EZPROJECT</p>
                <p><Link to='/register'>Create An Account</Link></p>
            </div>
        </div>
    )
}
export default Login