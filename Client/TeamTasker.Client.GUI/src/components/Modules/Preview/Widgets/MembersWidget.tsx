import { Avatar, Box, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReadEmployeeDto } from "../../../Types/ReadEmployeeDto";
import { Button } from "@mui/joy";

export default function MembersWidget({projectEmployees, leaderPermission}: {projectEmployees: ReadEmployeeDto[], leaderPermission: boolean})
{
    return(
        <Paper elevation={3} sx={{display: "flex", flexDirection:"column", height: "12rem", mt: "2rem"}}>
            <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem"}}>
                    Members
            </Typography>

            <Box sx={{display: "flex", flexDirection: "row", ml: "1.5rem", mt: "0.5rem"}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    {projectEmployees.map(employee => (
                    
                        employee == null 
                        ?
                        <></>
                        :
                        <>
                            <Avatar alt="Cindy Baker" src={employee.avatar} sx={{width: "1.5rem", height: "1.5rem"}} />
                            <Typography variant="body1" fontWeight={500} sx={{marginRight: "auto", mt: "0rem"}}>
                                {" "}{employee.firstName} {employee.lastName}{"   "}
                            </Typography>
                        </>
                    ))}
                </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", ml: "1.5rem"}}>
                {leaderPermission ?
                    <Button sx={{width: "5rem", mt: "1.5rem"}}>Add+</Button>
                :
                    <></>
                }
                        
                <NavLink to="projectmembers" style={{textDecoration: "none"}}>
                    <Button variant="outlined" sx={{width: "10rem", ml: "1.5rem", mt: "1.5rem"}}>
                        Show all members
                    </Button>
                </NavLink>
            </Box>

        </Paper>
    );
}