import { Avatar, AvatarGroup, Box, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PreviewTable from "./PreviewTable";

export default function PreviewDrawerContent()
{
    return(
        <Box sx={{width: "100%", height: "38rem"}}>
            <Grid container spacing={2}>

                {/* First layer */}
                <Grid item xs={3}>
                    <Typography variant="h5" fontWeight={550}>
                        <ExitToAppIcon/> Project Header Placeholder
                    </Typography>
                </Grid>
                <Grid item xs={9} display="flex" flexDirection="row">
                    <AvatarGroup total={7} sx={{marginLeft: "auto", alignItems: "center"}}>
                        <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/1.jpg" />
                        <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                    </AvatarGroup>
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={{ml: "1rem"}}>
                        <Button sx={{color: "#363b4d"}}><ShareIcon/></Button>
                        <Button sx={{color: "#363b4d"}}><SwapCallsIcon/></Button>
                        <Button sx={{color: "#363b4d"}}><EditNotificationsIcon/></Button>
                    </ButtonGroup>
                </Grid>

                {/* Second layer */}
                <Grid item xs={12}>
                    <Paper elevation={24} sx={{backgroundColor: "#f7f8f9", mt: "2rem", height: "38rem"}}>       
                        <Grid container spacing={2} sx={{ml: "0.2rem"}}>
                            {/* Boxes */}
                            <Grid item xs={3} sx={{mt: "1rem"}}>
                                <Paper elevation={4} sx={{backgroundColor: "white", width: "90%", height: "12rem"}}>
                                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{pt: "2.8rem"}}>
                                        <img src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png"/>
                                        <Typography variant="h5" fontWeight={550}>
                                            70+ elements
                                        </Typography>
                                    </Box>
                                    <Typography sx={{mt: "2rem"}}>
                                        <Button>Show</Button>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3} sx={{mt: "1rem"}}>
                                <Paper elevation={4} sx={{backgroundColor: "white", width: "90%", height: "12rem"}}>
                                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{pt: "3.2rem"}}>
                                        <img src="https://img.icons8.com/?size=256&id=63652&format=png" style={{width: "3.5rem"}}/>
                                        <Typography variant="h5" fontWeight={550}>
                                            Text Placeholder
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={3} sx={{mt: "1rem"}}>
                                <Paper elevation={4} sx={{backgroundColor: "white", width: "90%", height: "12rem"}}>
                                    <Box sx={{pt: "1.5rem"}}>
                                        <Typography variant="h5" color="#C70039" fontWeight={550}>
                                            Text Placeholder
                                        </Typography>
                                        <Typography variant="h5" color="#2ECC71" fontWeight={550} sx={{mt: "1rem"}}>
                                            Text Placeholder
                                        </Typography>
                                        <Typography variant="h5" color="#339EF7" fontWeight={550} sx={{mt: "1rem"}}>
                                            Text Placeholder
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={3} sx={{mt: "1rem"}}>
                                <Paper elevation={24} sx={{backgroundColor: "lightgray", width: "90%", height: "12rem"}}>
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* Third Layer */}
                        <Grid item xs={11} sx={{mt: "1.5rem", ml: "1.2rem"}}>
                            <Paper elevation={10}>
                                <PreviewTable/>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}