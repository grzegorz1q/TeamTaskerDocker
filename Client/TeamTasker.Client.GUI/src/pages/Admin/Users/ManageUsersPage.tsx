import CreateUser from '../../../components/Admin/ManageUsers/CreateUser';
import ManageUsersHome from '../../../components/Admin/ManageUsers/ManageUsersHome';
import ResetPassword from '../../../components/Admin/ManageUsers/ResetPassword';

function renderSwitch(pathnName: string)
{
    switch(pathnName)
    {
        case "/admindashboard/manageusers":
            return <ManageUsersHome />;

        case "/admindashboard/manageusers/createuser":
            return <CreateUser />;

        case "/admindashboard/manageusers/resetpassword":
            return <ResetPassword />
            
        default:
            return <h1>404 - cannot find manage users module.</h1>;
    }
}

export default function ManageUsersPage() {

    let pathName = location.pathname;

    return (
        <>      
        
        {renderSwitch(pathName)}

        </>
    );
}