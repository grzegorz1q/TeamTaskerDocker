import { Box, Typography, CircularProgress, Button, FormControl, FormLabel } from "@mui/material";
import ProjectCard from "../../components/ProjectsPage/ProjectCard";
import { useEffect, useState } from "react";
import { ReadUserDto } from "../../components/Types/ReadUserDto";
import GetLoggedInUser from "../../components/ProjectsPage/API/GetUserName";
import { NavLink } from "react-router-dom";
import CheckLoggedInPermission from "../../components/Connection/API/CheckLoggedInPermission";
import CheckAdminPermission from "../../components/Connection/API/CheckAdminPermission";
import DeleteTokenFromCookies from "../../components/Connection/DeleteTokenFromCookies";
import { ReadProjectDto } from "../../components/Types/ReadProjectDto";
import { GetUsersProjects } from "../../components/ProjectsPage/API/GetUsersProjects";
import { Input } from "@mui/joy";
import ChangePassword from "../../components/ProjectsPage/API/ChangePassword";

export default function ProjectsPage()
{
    //TODO: method to get 
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSuccess, setSendSuccess] = useState<number>(0);
    sendSuccess;
    const [readUser, setUser] = useState<ReadUserDto>();
    const [newPassword, setNewPassword] = useState<string>("");
    const [userPermission, setUserPermission] = useState<boolean>(false);
    const [adminUserPermission, setAdminUserPermission] = useState<boolean>(false);
    //const [teamUserPermission, setTeamUserPermission] = useState<boolean>(false);
    const [projects, setProjects] = useState<ReadProjectDto[]>([]);
    const [userId, setUserId] = useState<number>(0);

    const [loadingLoggedInState, setLoadingLoggedInState] = useState<boolean>(true);
    const [loadingAdminState, setLoadingAdminState] = useState<boolean>(true);

    CheckAdminPermission(setAdminUserPermission, setLoadingAdminState);
    //TempTeamEmployees(setTeamUserPermission);
    
    useEffect(() => {
        GetLoggedInUser(setUser, setSendingState, setUserId);
        GetUsersProjects(userId, setProjects);
    }, [userId]);
    
    
    CheckLoggedInPermission(setUserPermission, setLoadingLoggedInState);


    if(sendingState || loadingLoggedInState || loadingAdminState)
    {
        return(
            <CircularProgress sx={{color: "white"}} size={100}/>
        );
    }

    if(!adminUserPermission && !userPermission)
        return(
            <>
                <h1>You need to login first to use this resource.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained">LOG IN</Button></NavLink>
            </>
            );

    if(adminUserPermission && !userPermission)
        return(
            <>
                <h1>Admin account cannot be used for project management.</h1>
                <h1>Please login to your employee account instead.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained" onClick={() => {DeleteTokenFromCookies()}}>LOG OUT</Button></NavLink>
            </>
            );

    console.log("userPermission: " + userPermission + "projects.length: " + projects.length);
    //console.log(projects[0].name);

    var tempIterator = 0;

    projects.map(project => 
        {
            if(project == null)
                tempIterator = tempIterator + 1;
        }
    );

    if(readUser?.resetPassword)
        return(
                <Box>
                    <Box>
                        <Typography fontSize={45} fontWeight={550} mt={-10}>
                            Welcome {readUser?.firstName}!
                        </Typography>
                        <Typography fontSize={45} fontWeight={550} mb={7}>
                            You can now set your new password:
                        </Typography>
                        <FormLabel>
                            <FormControl>
                                <Input id="password" 
                                type="password"
                                value={newPassword} 
                                onChange={(event) => {setNewPassword(event.target.value)}} 
                                placeholder="New password" 
                                sx={{minWidth: "35rem", minHeight: "3rem"}}/>
                            </FormControl>
                        </FormLabel>
                    </Box>
                    <Button 
                    type="submit" 
                    sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem", mt: "2rem"}}
                    onClick={() => {
                        ChangePassword(newPassword, setSendingState, setSendSuccess);
                    }}
                    >
                        Confirm</Button>
                </Box>
            );


    if((userPermission && projects.length == 0) || tempIterator == projects.length)
        return(
            <>
                <Typography fontSize={45} fontWeight={550} mt={-10}>
                    Welcome {readUser?.firstName}!
                </Typography>
                <Typography fontSize={45} fontWeight={550} mb={7}>
                    Currently, you are not assigned to any project.
                </Typography>
            
                <Typography fontSize={45} fontWeight={550} mb={7}>
                    Contact your administrator.
                </Typography>
            
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained" onClick={() => {DeleteTokenFromCookies()}}>LOG OUT</Button></NavLink>
            </>
        );

    return(<>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography fontSize={45} fontWeight={550} mt={-10}>
                Welcome {readUser?.firstName}!
            </Typography>
            <Typography fontSize={45} fontWeight={550} mb={7}>
                Choose a project to work on:
            </Typography>
            {/* <NavLink to="/projectname/preview" style={{textDecoration: "none"}}><ProjectCard/></NavLink> */}
            <Box sx={{display: "flex", flexDirection: "row"}}>
                {projects.map(project => (
       
                project == null 
                ? 
                <></> 
                :
                <NavLink key={project.id} to={`/projectname/${project.id}/preview`} style={{textDecoration: "none", marginLeft: "1rem", marginRight: "1rem"}}><ProjectCard id={project.id} name={project.name} description={project.description}/></NavLink>

                ))}
            </Box>
        </Box>
    
    </>);
}