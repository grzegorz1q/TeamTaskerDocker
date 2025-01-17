import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoupeIcon from '@mui/icons-material/Loupe';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function ManageTeamsHome()
{
    return(
        <>
        <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
            <Grid container spacing={12}>

                <Grid item xs={12} sx={{display: "flex"}}>
                    <Button onClick={() => {location.href = "/admindashboard";}}>
                        <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                    </Button>
                    <Typography variant="h4">
                        Manage Teams
                    </Typography>
                </Grid>

            <Grid item xs={3}>
                <NavLink to="/admindashboard/manageteams/addusertoteam" style={{textDecoration: "none"}}>
                <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
                <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                    <GroupAddIcon sx={{fontSize: "3rem"}}/>
                    <Typography>
                    Add User to the Team
                    </Typography>
                </Paper>
                </motion.div>
                </NavLink>
            </Grid>

            <Grid item xs={3}>
                <NavLink to="/admindashboard/manageteams/createteam" style={{textDecoration: "none"}}>
                <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
                <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                    <LoupeIcon sx={{fontSize: "3rem"}}/>
                    <Typography>
                    Create New Team
                    </Typography>
                </Paper>
                </motion.div>
                </NavLink>
            </Grid>

            <Grid item xs={3}>
                <NavLink to="/admindashboard/manageteams/manageteamleader" style={{textDecoration: "none"}}>
                <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
                <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                    <EngineeringIcon sx={{fontSize: "3rem"}}/>
                    <Typography>
                    Manage Team Leader
                    </Typography>
                </Paper>
                </motion.div>
                </NavLink>
            </Grid>

            <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <ManageAccountsIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Edit Team
              </Typography>
            </Paper>
            </Grid>

            <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <ViewListIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Teams List
              </Typography>
            </Paper>
            </Grid>

            </Grid>
        </Box>
        </>
    );
}