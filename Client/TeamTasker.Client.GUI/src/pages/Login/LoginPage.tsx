import { AccountCircle, Key } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { Paper, Typography, styled, CircularProgress } from "@mui/material";
import Button from '@mui/material-next/Button';
import { Form, Formik, useFormikContext } from "formik";
import { LoginDto } from "../../components/Types/LoginDto";
import FetchData from "../../components/Login/API/FetchData";
import { useState } from "react";
import CheckLoggedInPermission from "../../components/Connection/API/CheckLoggedInPermission";
import CheckAdminPermission from "../../components/Connection/API/CheckAdminPermission";
import PostErorrSnackbar from "../../components/Connection/Notifies/PostSnackbar";
import appLogo from "../../assets/appLogoCircle.png";


const ContentSeparator = styled("hr")({
    border: "0",
    clear: "both",
    display: "block",
    width: "96%",               
    //backgroundImage: "linear-gradient(to right, transparent 0%, #a8a5a5 40%, #a8a5a5 60%, transparent 100%)",
    backgroundColor: "lightgray",
    height: "1px"
});

function onSubmit(LoginDto: LoginDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>, sendSucess: number)
{    
    FetchData(LoginDto, setSendingState, setSendSucess);
    sendSucess;
    // if(sendSucess == 1)
    // {
    //     console.log("Success!");
    //     location.reload();// = "/projectspage";
    // }
}

function LoginPageContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<LoginDto>();

    return(
            <Form>
                <Paper elevation={24} sx={{minWidth: "28rem", minHeight: "32rem", backgroundColor: "#f0f5ff", display: "flex", flexDirection: "column", alignItems: "center"}}>
                
                <img style={{marginTop: "1rem"}} src={appLogo} height="100rem"></img>
                
                <Typography sx={{mt: "0rem", mb: "0.5rem", textShadow: '4px 3px 3px rgba(0, 0, 0, 0.4)'}} variant="h4" color="#727273">
                    <span style={{color: "#ff6633", fontWeight: "bold"}}>T</span>
                    <span style={{color: "white", fontWeight: "bold"}}>eam</span> 
                    <span style={{color: "#ff6633", fontWeight: "bold"}}>T</span> 
                    <span style={{color: "white", fontWeight: "bold"}}>asker</span> 
                </Typography>


                <ContentSeparator sx={{marginBottom: "2.5rem"}}/>

                <Input value={formikProps.values.email} onChange={formikProps.handleChange} id="email" defaultValue="" sx={{alignSelf: "flex-center", backgroundColor: "#ebf7ff", minWidth: "20rem",  maxWidth: "20rem", mb: "1.3rem"}}
                startDecorator={<AccountCircle />}
                placeholder="Account login"
                />

                <Input value={formikProps.values.password} onChange={formikProps.handleChange} id="password" defaultValue="" type="password" sx={{backgroundColor: "#ebf7ff", minWidth: "20rem",  maxWidth: "20rem"}}
                startDecorator={<Key />}
                placeholder="Account password"
                />

                {/* <NavLink to="/projectname/preview" style={{textDecoration: "none"}}> */}
                    {   
                        sendingState
                        ?
                        <CircularProgress sx={{mt: "3rem"}}/>
                        :
                        <Button type="submit" sx={{mt: "3rem", backgroundColor: "#363b4d", minWidth: "10rem", fontFamily: "Roboto, sans-serif"}} variant="filled">Log in</Button>
                    }
                {/* </NavLink> */}

                <Typography sx={{mt: "1rem", ml:"0.5rem"}} color="#242c" fontSize={15}>
                    
                </Typography>

            </Paper>
            <Typography color="white" sx={{mt:"1rem", fontFamily: "Roboto, sans-serif"}}>
                Designed by 
                    <span style={{color: "#ff6633", fontWeight: "bold"}}> T</span>
                    <span style={{color: "white", fontWeight: ""}}>eam</span> 
                    <span style={{color: "#ff6633", fontWeight: "bold"}}>T</span> 
                    <span style={{color: "white", fontWeight: ""}}>asker </span> 
                ©
            </Typography>
        </Form>
    );
}

export default function LoginPage()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    const [loggedInUserPermission, setloggedInUserPermission] = useState<boolean>(false);
    const [adminUserPermission, setAdminUserPermission] = useState<boolean>(false);

    const [loadingLoggedInState, setLoadingLoggedInState] = useState<boolean>(true);
    const [loadingAdminState, setLoadingAdminState] = useState<boolean>(true);
    loadingLoggedInState;
    loadingAdminState;


    CheckLoggedInPermission(setloggedInUserPermission, setLoadingLoggedInState);
    CheckAdminPermission(setAdminUserPermission, setLoadingAdminState);

    if(loggedInUserPermission && !adminUserPermission)
    {
        location.href = "/projectspage";
        return(<></>);
    }

    if(!loggedInUserPermission && adminUserPermission)
    {
        location.href = "/admindashboard";
        return(<></>);
    }

    return(
        <>
            {sendingState == false && sendSucess == 2 ? <PostErorrSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            <Formik initialValues={{email: "", password: ""}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess, sendSucess)}}
            >
                <LoginPageContent sendingState={sendingState}/>
            </Formik>
        </>
    );    
}