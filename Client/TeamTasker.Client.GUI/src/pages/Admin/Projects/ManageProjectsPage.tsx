import AssignTeam from '../../../components/Admin/ManageProjects/AssignTeam';
import CreateProject from '../../../components/Admin/ManageProjects/CreateProject';
import ManageProjectsHome from '../../../components/Admin/ManageProjects/ManageProjectsHome';

function renderSwitch(pathnName: string)
{
    switch(pathnName)
    {
        case "/admindashboard/manageprojects":
            return <ManageProjectsHome />;

        case "/admindashboard/manageprojects/createproject":
            return <CreateProject/>;

        case "/admindashboard/manageprojects/assignteam":
            return <AssignTeam/>;
            
        default:
            return <h1>404 - cannot find manage projects module.</h1>;
    }
}

export default function ManageProjectsPage() {

    let pathName = location.pathname;

    return (
        <>      
        
        {renderSwitch(pathName)}

        </>
    );
}