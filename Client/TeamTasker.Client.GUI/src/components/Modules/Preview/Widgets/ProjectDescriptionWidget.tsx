import { Textarea } from "@mui/joy";
import { Paper, Typography } from "@mui/material";
import { ReadProjectDto } from "../../../Types/ReadProjectDto";

export default function ProjectDescriptionWidget({project}: {project: ReadProjectDto})
{
    return(
        <Paper elevation={3} sx={{display: "flex", flexDirection:"column", height: "12rem", mt: "2rem"}}>
            <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem"}}>
                Project Description
            </Typography>

            <Textarea disabled={true} defaultValue={project.description} sx={{width: "90%", ml: "2rem", mt: "1.5rem", height: "5rem"}} variant="plain"/>

        </Paper>
    );
}