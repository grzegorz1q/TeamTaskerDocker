import { Box, Typography } from "@mui/material";
import PreviewNotificationsTable from "../../components/Modules/Notifcations/PreviewNotificationsTable";

export default function Notifications()
{
    return(
        <>
            <Box sx={{width: "100%", height: "42rem", marginLeft: "6rem"}}>
                <Box sx={{display: "flex", mb: "1.5rem"}}>
                    <Typography variant="h4" sx={{marginRight: "auto"}}>
                        Notifications
                    </Typography>
                </Box>
                <PreviewNotificationsTable/>
            </Box>
        </>
    );
}