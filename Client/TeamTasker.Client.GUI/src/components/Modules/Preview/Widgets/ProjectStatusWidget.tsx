import { Paper, Typography } from "@mui/material";
import { ReadProjectDto } from "../../../Types/ReadProjectDto";
import StatusSelect from "../StatusSelect";
import { Textarea } from "@mui/joy";

const statusString: {[key: string]: string} = 
{
    "OnTheRightPath": "All tasks are on schedule. The people involved know their tasks. The system is set up well.",
    "OnHold": "All work in the project has been put on hold.",
    "Finished": "",
    "CriticallyOffThePath": "Project requires further supervision as fast as possible.",
    default: "There was an issue with displaying status description."
}

export default function ProjectStatusWidget({project, sendingState}: {project: ReadProjectDto, sendingState: boolean})
{
    return(
        <Paper elevation={3} sx={{display: "flex", flexDirection:"column", height: "12rem"}}>
            <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem"}}>
                Project Status
            </Typography>
            {!sendingState ? <StatusSelect projectId={project.id} projectStatus={project.status}/> : <></>}
        
            <Textarea defaultValue={!sendingState ? statusString[project.status] : ""} sx={{width: "97%", ml: "1rem", mt:"1rem", height: "2rem"}} variant="plain"/>

        </Paper>
    );
}