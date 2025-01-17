import { Box, Button } from "@mui/material";
import MuiMiniDrawer from "../../components/Dashboard/MuiMiniDrawer";
import PreviewDrawerContent from "../../components/Dashboard/PreviewDrawerContent";

import Board from "../DrawerModules/Board";
import IssuesList from "../DrawerModules/IssuesList";
import Notifications from "../DrawerModules/Notifications";
import ProjectFeed from "../DrawerModules/ProjectFeed";
import ProjectMembers from "../DrawerModules/ProjectMembers";
import ProjectPreview from "../DrawerModules/ProjectPreview";
import ProjectSettings from "../DrawerModules/ProjectSettings";
import UserSettings from "../DrawerModules/UserSettings";
import { useEffect, useState } from "react";
import CheckLoggedInPermission from "../../components/Connection/API/CheckLoggedInPermission";
import CheckAdminPermission from "../../components/Connection/API/CheckAdminPermission";
import { NavLink, useParams } from "react-router-dom";
import DeleteTokenFromCookies from "../../components/Connection/DeleteTokenFromCookies";
import { ReadProjectDto } from "../../components/Types/ReadProjectDto";
import { GetCurrentProjectInfo } from "../../components/Modules/API/GetCurrentProjectInfo";
import ProjectSchedule from "../DrawerModules/ProjectSchedule";
import { CheckIfMember } from "../../components/Modules/API/CheckIfMember";

function renderSwitch(pathnName: string, projectId: string | undefined)
{
    if(projectId == undefined)
        return <h1>404 - invalid project's id in the url</h1>;

    switch(pathnName)
    {
        case "/projectname/test":
            return <PreviewDrawerContent/>;

        case `/projectname/${projectId}/preview`:
            return <ProjectPreview projectId={projectId}/>;

        case `/projectname/${projectId}/issueslist`:
            return <IssuesList projectId={projectId}/>;

        case `/projectname/${projectId}/notifications`:
            return <Notifications/>; 

        case `/projectname/${projectId}/projectfeed`:
            return <ProjectFeed projectId={projectId}/>;

        case `/projectname/${projectId}/projectsettings`:
            return <ProjectSettings/>;

        case `/projectname/${projectId}/usersettings`:
            return <UserSettings/>;

        case `/projectname/${projectId}/board`:
            return <Board projectId={projectId}/>;

        case `/projectname/${projectId}/projectmembers`:
            return <ProjectMembers projectId={projectId}/>;

            case `/projectname/${projectId}/projectschedule`:
                return <ProjectSchedule projectId={projectId}/>;
            
        default:
            return <h1>404 - cannot find the module</h1>;
    }
}

export default function ModulesContainer()
{

    const [loggedInUserPermission, setloggedInUserPermission] = useState<boolean>(false);
    const [adminUserPermission, setAdminUserPermission] = useState<boolean>(false);

    const [loadingLoggedInState, setLoadingLoggedInState] = useState<boolean>(true);
    const [loadingAdminState, setLoadingAdminState] = useState<boolean>(true);

    CheckLoggedInPermission(setloggedInUserPermission, setLoadingLoggedInState);
    CheckAdminPermission(setAdminUserPermission, setLoadingAdminState);
    let pathName = location.pathname;

    const { projectId } = useParams<{projectId: string}>();

    const temp: ReadProjectDto = {
        id: 0,
        name: "",
        status: "default",
        description: "",
        deadline: "",
        isComplete: false,
        teamId: 0,
        picture: "",
        comments: []
    }

    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [project, setProject] = useState<ReadProjectDto>(temp);
    sendSucess;
    
    const [isMember, setIsMember] = useState<boolean>(false);
    const [gettingState, setGettingState] = useState<boolean>(false);
    const [isMemberSuccess, setIsMemberSuccess] = useState<number>(0);
    isMemberSuccess;

    useEffect(() => {
        GetCurrentProjectInfo(projectId, setProject, setSendingState, setSendSucess);
        CheckIfMember(projectId, setIsMember, setGettingState, setIsMemberSuccess);
    }, [projectId, loggedInUserPermission]);

    if(loadingAdminState || loadingLoggedInState)
        return(
        <>
            <MuiMiniDrawer />
        </>
    );

    if(!sendingState && project.id == 0)
    {
        return(
            <>
                <h1>404 - We could not find a project with given Id.</h1>
                <NavLink to="/projectspage" style={{textDecoration: "none"}}><Button size="large" variant="contained">Back to projects</Button></NavLink>
            </>
        );
    }

    if(!adminUserPermission && !loggedInUserPermission)
        return(
            <>
                <h1>You need to login first to use this resource.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained">LOG IN</Button></NavLink>
            </>
            );

    if(adminUserPermission && !loggedInUserPermission)
        return(
            <>
                <h1>Admin account cannot be used for project management.</h1>
                <h1>Please login to your employee account instead.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained" onClick={() => {DeleteTokenFromCookies()}}>LOG OUT</Button></NavLink>
            </>
            );

    if(!isMember && !gettingState)
    {
        return(
            <>
                <h1>403 - You are not authorized to view this project.</h1>
                <NavLink to="/projectspage" style={{textDecoration: "none"}}><Button size="large" variant="contained">Back to projects</Button></NavLink>
            </>
        );
    }

    return(
        <Box sx={{ display: 'flex', width: "90vw", ml: "-15rem", backgroundColor: "white"}}>
            
            <MuiMiniDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 0}}>
                
                {renderSwitch(pathName, projectId)}

            </Box>
        </Box>
    );
}