import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ReadIssueDto } from "../../components/Types/ReadIssuesDto";
import { GetProjectIssues } from "../../components/Modules/API/GetProjectIssues";
import GanttIndex from "../../components/Modules/ProjectSchedule/Gantt";

export default function ProjectSchedule({projectId}: {projectId: string})
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [allIssues, setAllIssues] = useState<ReadIssueDto[]>([]);
    sendSucess;
    allIssues;

    useEffect(() => {
        GetProjectIssues(projectId, setAllIssues, setSendingState, setSendSucess);
    }, []);

    if(sendingState)
        return(<CircularProgress />);

    return (
        <>
            <Box sx={{marginLeft: "7rem"}}>
                <Box sx={{width: "100%", height: "95vh", mt: "7rem"}}>
                    <Box sx={{display: "flex", mb: "1.5rem"}}>
                        <Typography variant="h4" sx={{marginRight: "auto"}}>
                            Gantt Chart
                        </Typography>
                    </Box>

                    <GanttIndex projectId={projectId}/>

                </Box>
            </Box>
        </>
    );
}