import { Button, Typography } from '@mui/material';
import './App.css'
import LoginPage from "./pages/Login/LoginPage"
import ModulesContainer from './pages/ModulesContainer/ModulesContainer';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
//import ManageTeams from './components/Admin/ManageTeams';

function temp()
{
  return(
    <>
      <Typography fontWeight={550} fontSize={70}>
        404 - Page not found
      </Typography>

    <NavLink to="/login"><Button sx={{mt: "5rem"}} variant='contained'>Login Page</Button></NavLink>

    </>
  );
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage}/>
          <Route path="projectname/:projectId/*" Component={ModulesContainer}/>
          <Route path="/" Component={temp}/>
          <Route path="/admindashboard/*" Component={AdminDashboard}/>
          <Route path="/projectspage" Component={ProjectsPage}/>
          {/* <Route path="/admindashboard/manageteams" Component={ManageTeams}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
