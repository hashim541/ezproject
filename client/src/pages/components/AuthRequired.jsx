import { Navigate, Outlet } from 'react-router-dom'
import useAppContext from './useAppContext'

function AuthRequired (){
    const {User} = useAppContext()
    return User.auth ?<Outlet/> :<Navigate to='/login'/>
}

export default AuthRequired