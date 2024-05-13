import { useEffect } from "react"
import useAppContext from "../components/useAppContext"
import { Link } from "react-router-dom"
import logo from '../../../public/logo.png'

function Register(){
    const {setNav, handelUserAuthSubmit, checkForValidEmail, validEmail} = useAppContext()
    useEffect(()=>{
        setNav('register')
    },[])
    return(
        <div className="auth">
            <img className="logo-img" src={logo} alt="" />
            <h1 className="auth-h1">Register To EZPROJECT</h1>
            <form className="auth-form"  onSubmit={(e)=>handelUserAuthSubmit(e,'register')}>
                <div className="inps">
                    <label htmlFor="username">Name</label>
                    <input type="text" className="inp" id="username" name="username" required/>
                </div>
                <div className="inps">
                    <label htmlFor="email">Email</label>
                    <input type="text" className={validEmail == 'Valid' || validEmail.length == 0 ? 'inp':'inp invalid'} id="email" name="email" onChange={(e)=>checkForValidEmail(e)} required/>
                    {validEmail != 'Valid' && <p className="valid-p">{validEmail}</p>}
                </div>
                <div className="inps">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="inp" id="password" name="password" required min={6} />
                </div>
                <div className="inps">
                    <label htmlFor="c-password">Confirm Password</label>
                    <input type="password" className="inp" id="c-password" name="confirmPassword" required min={6} />
                </div>
                <div className="inps">
                    <input className="p-btn register auth-btn" type="submit" value='Register' disabled ={validEmail != 'Valid'? true : false } />
                </div>
            </form>
            <div className="auth-option">
                <p>Already have an account</p>
                <p><Link to='/login'>login</Link></p>
            </div>
        </div>
    )
}
export default Register