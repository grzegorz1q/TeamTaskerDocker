import Box from '@mui/material/Box';
import { Grid, Paper, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoIcon from '@mui/icons-material/Info';
import {motion} from "framer-motion";
import { NavLink } from 'react-router-dom';

export default function MuiAdminNavbar() {

  return (
    <>      
      <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
        <Grid container spacing={12}>
          <Grid item xs={12} sx={{display: "flex"}}>
            <Typography variant="h4">
              Administration
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <NavLink to="/admindashboard/manageusers" style={{textDecoration: "none"}}>
              <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
              <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                <GroupAddIcon sx={{fontSize: "3rem"}}/>
                <Typography>
                  Manage Users
                </Typography>
              </Paper>
              </motion.div>
            </NavLink>
          </Grid>

          <Grid item xs={3}>
            <NavLink to="/admindashboard/manageprojects" style={{textDecoration: "none"}}>
              <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
              <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                <VideoLabelIcon sx={{fontSize: "3rem"}}/>
                <Typography>
                  Manage Projects
                </Typography>
              </Paper>
              </motion.div>
            </NavLink>
          </Grid>

          <Grid item xs={3}>
            <NavLink to="/admindashboard/manageteams" style={{textDecoration: "none"}}>
              <motion.div whileHover={{scale: 1.05, boxShadow: "7px 8px 54px -6px rgba(0, 0, 0, 0.2)"}}>
              <Paper elevation={5} sx={{padding: "2rem", minWidth: "13rem"}}>
                <GroupsIcon sx={{fontSize: "3rem"}}/>
                <Typography>
                  Manage Teams
                </Typography>
              </Paper>
              </motion.div>
            </NavLink>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <SettingsIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Manage System
              </Typography>
            </Paper>
          </Grid>

          {/*Fillers*/}

          <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <NotificationsActiveIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Notifications
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <InfoIcon sx={{fontSize: "3rem"}}/>
              <Typography>
                Informations
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <BatteryUnknownIcon sx={{fontSize: "3rem"}}/>
              <Typography>
              Placeholder 3
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={5} sx={{padding: "2rem", backgroundColor: "#e3e3e3", minWidth: "13rem"}}>
              <BatteryUnknownIcon sx={{fontSize: "3rem"}}/>
              <Typography>
              Placeholder 4
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Box>

    </>
  );
}