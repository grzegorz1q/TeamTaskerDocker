import { Divider, List} from "@mui/material";
import { NavLink } from "react-router-dom";

import ModuleButton from "./ModuleButton";
import { useState } from "react";
import CheckLeaderPermission from "../../Connection/API/CheckLeaderPermission";

export default function ModulesLinks({isOpen}: {isOpen: boolean}){
    const [userPermission, setUserPermission] = useState<boolean>(false);

    CheckLeaderPermission(setUserPermission);

    return(
      <>  
        <List>
          <NavLink to="preview" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={5} buttonText="Project Preview"/></NavLink>
          <NavLink to="projectschedule" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={10} buttonText="Gantt Chart"/></NavLink>
          <NavLink to="board" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={6} buttonText="Default Board"/></NavLink>
          <NavLink to="issueslist" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={4} buttonText="Issues List"/></NavLink>
          <NavLink to="notifications" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={9} buttonText="Notifications"/></NavLink>
          <NavLink to="projectfeed" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={1} buttonText="Project Feed"/></NavLink>
          <NavLink to="projectmembers" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={7} buttonText="Project Members"/></NavLink>
        </List>
          <Divider sx={{backgroundColor: "white"}} />
          <List sx={{backgroundColor: "#363b4d"}}>
            <NavLink to="usersettings" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={3} buttonText="User Settings"/></NavLink>
            {userPermission ? 
             <NavLink to="projectsettings" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={8} buttonText="Project Settings"/></NavLink>
             :
             <></>  
          }
            {/* <NavLink to="projectsettings" style={{textDecoration: "none"}}><ModuleButton isOpen={isOpen} listKey={8} buttonText="Project Settings"/></NavLink> */}
            {/* <ModuleButton isOpen={isOpen} listKey={5} buttonText="Report a bug"/> */}
          </List>

      </>);
}