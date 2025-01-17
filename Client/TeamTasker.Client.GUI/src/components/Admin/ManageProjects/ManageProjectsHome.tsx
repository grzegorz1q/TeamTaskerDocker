import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import CallToActionIcon from '@mui/icons-material/CallToAction';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function ManageProjectsHome()
{
    return(
        <>
        <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none", marginLeft: "0rem"}}>
            <Grid container spacing={12}>

                <Grid item xs={12} sx={{display: "flex"}}>
                    <Button onClick={() => {location.href = "/admindashboard";}}>
                        <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                    </Button>
                    <Typography variant="h4">
                        Manage Projects
                    </Typography>
                </Grid>

            <Grid item xs={3}>
                <NavLink to="/admindashboard/manageprojects/createproject" style={{textDecoration: "none"}}>
                <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
                <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                    <AddBoxIcon sx={{fontSize: "3rem"}}/>
                    <Typography>
                    Create New Project
                    </Typography>
                </Paper>
                </motion.div>
                </NavLink>
            </Grid>

            <Grid item xs={3}>
                <NavLink to="/admindashboard/manageprojects/assignteam" style={{textDecoration: "none"}}>
                <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
                <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                    <FolderSharedIcon sx={{fontSize: "3rem"}}/>
                    <Typography>
                    Assign Team to the Project
                    </Typography>
                </Paper>
                </motion.div>
                </NavLink>
            </Grid>

            <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <CallToActionIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Edit Project
              </Typography>
            </Paper>
            </Grid>

            <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <ViewListIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Projects List
              </Typography>
            </Paper>
            </Grid>

            </Grid>
        </Box>
        </>
    );
}