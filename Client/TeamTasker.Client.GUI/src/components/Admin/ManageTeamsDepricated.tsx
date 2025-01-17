import { Button, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import CheckAdminPermission from "../../components/Connection/API/CheckAdminPermission";
import CheckLoggedInPermission from "../../components/Connection/API/CheckLoggedInPermission";
import { NavLink } from "react-router-dom";
import DeleteTokenFromCookies from "../../components/Connection/DeleteTokenFromCookies";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from "../Navigation/AppBar/AppBar.tsx";
import { Grid,} from '@mui/material';

import Select from '@mui/material/Select';

export default function ManageTeams()
{
    const [loggedInUserPermission, setloggedInUserPermission] = useState<boolean>(false);
    const [adminUserPermission, setAdminUserPermission] = useState<boolean>(false);
    const [loadingLoggedInState, setLoadingLoggedInState] = useState<boolean>(true);
    const [loadingAdminState, setLoadingAdminState] = useState<boolean>(true);
    loadingLoggedInState;
    loadingAdminState;

    CheckLoggedInPermission(setloggedInUserPermission, setLoadingLoggedInState);
    CheckAdminPermission(setAdminUserPermission, setLoadingAdminState);

    if(!adminUserPermission && !loggedInUserPermission)
        return(
            <>
                <h1>You need to login first to use this resource.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained">LOG IN</Button></NavLink>
            </>
            );

    if(!adminUserPermission && loggedInUserPermission)
        return(
            <>
                <h1>This resource requires admin account.</h1>
                <h1>Please login with a valid account to continue.</h1>
                <NavLink to="/login" style={{textDecoration: "none"}}><Button size="large" variant="contained" onClick={() => {DeleteTokenFromCookies()}}>LOG OUT</Button></NavLink>
            </>
            );

    return(
        <>
        <CssBaseline />
        <AppBar sx={{backgroundColor: "white"}} position="fixed">
            <Toolbar>
            {/*Here is the top navbar*/}
            <Box display="flex" flexDirection="row" sx={{marginLeft: "auto", alignItems: "center"}}>
                {/* <UserAvatarMenu /> */}
            </Box>
            </Toolbar>
        </AppBar>

        <Box sx={{width: "93vw", height: "75vh", backgroundColor: "none"}}>
            <Grid container>
                <Grid item xs={12} sx={{display: "flex"}}>
                    <Button onClick={() => {location.href = "/admindashboard";}}>
                        <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                    </Button>
                    <Typography variant="h4">
                        Manage Teams
                    </Typography>
                </Grid>

                <Grid item xs={2} sx={{display: "flex", marginTop: "3rem"}}>
                    <Typography variant="h5" sx={{marginBottom: "1rem"}}>
                        Project
                    </Typography>
                </Grid>
                <Grid item xs={10}></Grid>

                <Grid item xs={2} sx={{display: "flex"}}>
                    <Select
                    disabled
                    value={'MyValue'}
                    >
                        <MenuItem value={'MyValue'}>Example Project</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={10}></Grid>

            </Grid>
        </Box>
        </>
    );
}