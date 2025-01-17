import { Paper, Typography } from "@mui/material";
import tempText from "./previewText";
import { Textarea } from "@mui/joy";

export default function GettingStartedWidget()
{
    return(
        <Paper elevation={3} sx={{display: "flex", flexDirection:"column", height: "40rem", background: "white"}}>
            <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem"}}>
                Getting Started
            </Typography>

                <Textarea disabled={true} defaultValue={tempText} sx={{width: "90%", ml: "2rem", mt: "1.5rem", height: "30rem"}} variant="plain"/>
        </Paper>
    );
}