import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import IssueCard from "../../components/Modules/Board/IssueCard";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckLeaderPermission from "../../components/Connection/API/CheckLeaderPermission";
import { ReadIssueDto } from "../../components/Types/ReadIssuesDto";
import { GetProjectIssues } from "../../components/Modules/API/GetProjectIssues";

export default function Board({projectId}: {projectId: string})
{
    const [leaderPermission, setLeaderPermission] = useState<boolean>(false);
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    sendingState;
    sendSucess;
    

    //TODO: Temp solution - implement proper and more optimal data storing
    const [allIssues, setAllIssues] = useState<ReadIssueDto[]>([]);

    const [selectedOption, setSelectedOption] = useState<string>(() => {
        const storedOption = sessionStorage.getItem('issuesChange');
        return storedOption ? storedOption : "null";
      });


    useEffect(() => {
        //TODO: Temp solution - implement proper and more optimal data fetching
        GetProjectIssues(projectId, setAllIssues, setSendingState, setSendSucess);

        const handleStorageChange = () => {
            const storedOption = sessionStorage.getItem('issuesChange');
            if (storedOption && storedOption !== selectedOption) {
              setSelectedOption(storedOption);
            }
          };
          console.log("Changed on Session storage change: " + selectedOption);
          window.addEventListener('issuesChange', handleStorageChange);
    
          return () => {
              window.removeEventListener('issuesChange', handleStorageChange);
              //sessionStorage.removeItem('issuesChange');
          };


    }, [selectedOption]);
    
    CheckLeaderPermission(setLeaderPermission);

    //TODO: Change implementation of these lists, single generic component with issues list of a specific type
    return(
        <>
             <Box sx={{width: "100%", height: "95%", mt: "5rem", marginLeft: "6rem"}}>
                <Grid container>
                    <Grid item xs={4} sx={{display: "flex", mb: "1.5rem"}}>
                        <Typography variant="h4" sx={{marginRight: "auto"}}>
                            Basic Board
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{display: "flex", flexDirection: "row"}}>
                        {/* <ButtonGroup variant="text" aria-label="Basic button group" sx={{ml: "1rem", marginLeft: "auto"}}>
                            <Button sx={{color: "#363b4d"}}><ShareIcon/></Button>
                            <Button sx={{color: "#363b4d"}}><SwapCallsIcon/></Button>
                            <Button sx={{color: "#363b4d"}}><EditNotificationsIcon/></Button>
                        </ButtonGroup> */}
                    </Grid>
                </Grid>

                <Grid container spacing={6}>

                    {/* New issue */}
                    <Grid item xs={2}>
                        <Paper elevation={1} sx={{minHeight: "40rem", width: "115%", padding: "0.5rem", backgroundColor: "#fefefe"}}>
                        <Paper sx={{backgroundColor: "#1098ad", width: "100%", height: "0.5rem"}}/>
                            <Box display={"flex"} flexDirection={"column"} sx={{ml: "0.5rem"}}>
                                <Typography sx={{marginRight: "auto", mt: "0.8rem"}}>
                                    Status
                                </Typography>
                                <Typography fontWeight={550} sx={{marginRight: "auto"}}>
                                    New Issue
                                    {leaderPermission ? 
                                        <NavLink to={`/projectname/${projectId}/issueslist`}><Button sx={{width:"5rem", height: "1.5rem", ml: "2rem"}} variant="outlined">+</Button></NavLink>
                                    :
                                        <></>
                                    }
                                </Typography>
                            </Box>
                            <Divider sx={{mt: "1rem"}}/>
                            {allIssues.length == 0 ? <></> 
                            : 
                            allIssues.map((issue) => (
                                issue.status === "NewIssue" ? <IssueCard key={issue.id} ReadIssueDto={issue} projectId={projectId} leaderPermission={leaderPermission}/>
                                : <></> 
                            ))
                            }
                        </Paper>
                    </Grid>

                    {/* In progress */}
                    <Grid item xs={2}>
                        <Paper elevation={1} sx={{minHeight: "40rem", width: "115%", padding: "0.5rem", backgroundColor: "#fefefe"}}>
                        <Paper sx={{backgroundColor: "#255ed9", width: "100%", height: "0.5rem"}}/>
                            <Box display={"flex"} flexDirection={"column"} sx={{ml: "0.5rem"}}>
                                <Typography sx={{marginRight: "auto", mt: "0.8rem"}}>
                                    Status
                                </Typography>
                                <Typography fontWeight={550} sx={{marginRight: "auto"}}>
                                    In progress
                                </Typography>
                            </Box>
                            <Divider sx={{mt: "1rem"}}/>
                            {allIssues.length == 0 ? <></> 
                            : 
                            allIssues.map((issue) => (
                                issue.status === "InProgress" ? <IssueCard key={issue.id} ReadIssueDto={issue} projectId={projectId} leaderPermission={leaderPermission}/>
                                : <></> 
                            ))
                            }
                        </Paper>
                    </Grid>

                    {/* On hold */}
                    <Grid item xs={2}>
                        <Paper elevation={1} sx={{minHeight: "40rem", width: "115%", padding: "0.5rem", backgroundColor: "#fefefe"}}>
                        <Paper sx={{backgroundColor: "#c930b2", width: "100%", height: "0.5rem"}}/>
                            <Box display={"flex"} flexDirection={"column"} sx={{ml: "0.5rem"}}>
                                <Typography sx={{marginRight: "auto", mt: "0.8rem"}}>
                                    Status
                                </Typography>
                                <Typography fontWeight={550} sx={{marginRight: "auto"}}>
                                    On hold
                                </Typography>
                            </Box>
                            <Divider sx={{mt: "1rem"}}/>
                            {allIssues.length == 0 ? <></> 
                            : 
                            allIssues.map((issue) => (
                                issue.status === "OnHold" ? <IssueCard key={issue.id} ReadIssueDto={issue} projectId={projectId} leaderPermission={leaderPermission}/>
                                : <></> 
                            ))
                            }
                        </Paper>
                    </Grid>

                    {/* issue Done */}
                    <Grid item xs={2}>
                        <Paper elevation={1} sx={{minHeight: "40rem", width: "110%", padding: "0.5rem", backgroundColor: "#fefefe"}}>
                        <Paper sx={{backgroundColor: "#58e82c", width: "100%", height: "0.5rem"}}/>
                            <Box display={"flex"} flexDirection={"column"} sx={{ml: "0.5rem"}}>
                                <Typography sx={{marginRight: "auto", mt: "0.8rem"}}>
                                    Status
                                </Typography>
                                <Typography fontWeight={550} sx={{marginRight: "auto"}}>
                                    Issue Done
                                </Typography>
                            </Box>
                            <Divider sx={{mt: "1rem"}}/>
                            {allIssues.length == 0 ? <></> 
                            : 
                            allIssues.map((issue) => (
                                issue.status === "IssueDone" ? <IssueCard key={issue.id} ReadIssueDto={issue} projectId={projectId} leaderPermission={leaderPermission}/>
                                : <></> 
                            ))
                            }
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Box display={"flex"} flexDirection={"column"}>
                            {/* <Typography sx={{marginRight: "auto", mt: "0.5rem", ml: "0.5rem"}}>
                                + Add another list to the board
                            </Typography> */}
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </>
    );
}