import AddUserToTheTeam from '../../../components/Admin/ManageTeams/AddUserToTeam';
import CreateTeam from '../../../components/Admin/ManageTeams/CreateTeam';
import ManageTeamsHome from '../../../components/Admin/ManageTeams/ManageTeamsHome';
import TeamLeader from '../../../components/Admin/ManageTeams/TeamLeadaer';

function renderSwitch(pathnName: string)
{
    switch(pathnName)
    {
        case "/admindashboard/manageteams":
            return <ManageTeamsHome/>;

        case "/admindashboard/manageteams/addusertoteam":
            return <AddUserToTheTeam/>;

        case "/admindashboard/manageteams/createteam":
            return <CreateTeam/>;

        case "/admindashboard/manageteams/manageteamleader":
            return <TeamLeader/>;
            
        default:
            return <h1>404 - cannot find manage teams module.</h1>;
    }
}

export default function ManageTeamsPage() {

    let pathName = location.pathname;

    return (
        <>      
        
        {renderSwitch(pathName)}

        </>
    );
}