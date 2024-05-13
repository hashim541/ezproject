import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import NavOutlet from './pages/components/NavOutlet'

import { AppProvider } from './dataContext/AppContext'
import AuthRequired from './pages/components/AuthRequired'

import Navbar from './pages/components/Navbar'
import Home from './pages/dashboard/Home'
import Landing from './pages/auth/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Profile from './pages/dashboard/Profile'
import Notification from './pages/components/Notification'
import EditProfile from './pages/dashboard/EditProfile'
import CreateProject from './pages/dashboard/CreateProject'
import Project from './pages/dashboard/Project'
import EditProject from './pages/dashboard/EditProject'
import Followers from './pages/dashboard/Followers'

function App(){
  return(
    <>

      {/* notification */}
    <Router basename='/ezproject'>
      <AppProvider>
      <Navbar />
      <main className='main'>
      <Notification/>

        <Routes>

         
          <Route index path='/' element={<Landing />} />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
         

          <Route path='/home' element={<AuthRequired/>}>
            <Route index  element={<Home/>}/>
            <Route path='profile/:userId' element={<Profile/>}/>
            <Route path='editProfile' element={<EditProfile />}/>
            <Route path='createProject' element={<CreateProject />}/>
            <Route path='projects/:projectId' element={<Project />}/>
            <Route path='editProject/:projectId' element={<EditProject />}/>
            <Route path='followers/:userId' element={<Followers/>} />
          </Route>

          {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}

        </Routes>
      </main>
      </AppProvider>
    </Router>
    </>
  )
}

export default App