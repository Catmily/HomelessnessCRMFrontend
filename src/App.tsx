import { type ReactElement, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'

import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import { Homepage } from './pages/homepage'
import Login, { ChangePassword, Register } from './pages/login'
import { Profile } from './pages/profile'
import Case from './pages/case'
import AddNote from './pages/addNote'
import AddSafeguardingNote from './pages/addSafeguardingNote'
import Search from './pages/search'
import Cases from './pages/staffCases'
import {
  addTokenHeader,
  hasJWT,
  isJWTCaseWorker,
  isJWTSupervisor
} from './glue/Auth'
import FourOhFour from './pages/404'
import axios from 'axios'
import { SafeguardingAlerts } from './pages/safeguardingAlerts'
import Metrics from './pages/metrics'
import { AddNewCase } from './pages/addNewCase'
import { AddNewPerson } from './pages/addNewPerson'
import FourOhThree from './pages/403'
axios.defaults.withCredentials = true

// Wrapper JSX component to check for permissions while routing
export const AuthenticatedRoute = (props: any): ReactElement<any, any> => {
  const role = props.role
  if (!hasJWT()) {
    return <Navigate to='/login' replace />
  } else {
    const cw = isJWTCaseWorker()
    const sv = isJWTSupervisor()

    if (role === 'cw') {
      if (!cw) {
        return <Navigate to='/403' replace />
      }
    } else if (role === 'sv') {
      if (!sv) {
        return <Navigate to='/403' replace />
      }
    } else if (role === 'staff') {
      if (!(sv || cw)) {
        return <Navigate to='/403' replace />
      }
    }
  }

  return props.children ? props.children : <Outlet />
}

// If you're logged out, who cares about types?
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function LogoutComponent () {
  const navigate = useNavigate()

  useEffect(() => {
    void Logout().then(() => { navigate('/') })
  }, [])

  return <></>
}

// Logout by removing the JWT token from the browser and the server
export async function Logout (): Promise<boolean> {
  await axios.put(
    'https://homelesscrm.com/api/logout',
    {},
    { headers: addTokenHeader() }
  )
  localStorage.removeItem('access_token_cookie')
  return true
}

// We use :id as a param in order to get what user the
// staff member wants to look at/change.
function App (): ReactElement<any, any> {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AuthenticatedRoute>
            <Homepage />
          </AuthenticatedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/logout/'
        element={
          <AuthenticatedRoute>
            <LogoutComponent />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/profile/change-password/'
        element={
          <AuthenticatedRoute>
            <ChangePassword />
          </AuthenticatedRoute>
        }
      />

      <Route
        path='/profile/:id'
        element={
          <AuthenticatedRoute>
            <Profile hasCase={false} self={false} />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <AuthenticatedRoute>
            <Profile hasCase={false} self />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/profile/add'
        element={
          <AuthenticatedRoute>
            <AddNewPerson />
          </AuthenticatedRoute>
        }
      />

      <Route
        path='/case/:id'
        element={
          <AuthenticatedRoute>
            <Case />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/cases/'
        element={
          <AuthenticatedRoute>
            <Cases />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/note/user/:id'
        element={
          <AuthenticatedRoute>
            <AddNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/case/add/:id'
        element={
          <AuthenticatedRoute>
            <AddNewCase />
          </AuthenticatedRoute>
        }
      />

      <Route
        path='/metrics/'
        element={
          <AuthenticatedRoute role='sv'>
            <Metrics />
          </AuthenticatedRoute>
        }
      />

      <Route
        path='/search/'
        element={
          <AuthenticatedRoute>
            <Search />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/safeguarding/user/add/:id'
        element={
          <AuthenticatedRoute>
            <AddSafeguardingNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/safeguarding/user/:id'
        element={
          <AuthenticatedRoute>
            <SafeguardingAlerts />
          </AuthenticatedRoute>
        }
      />
      <Route path='/403' element={<FourOhThree />} />

      <Route path='*' element={<FourOhFour />} />
    </Routes>
  )
}

export default App
