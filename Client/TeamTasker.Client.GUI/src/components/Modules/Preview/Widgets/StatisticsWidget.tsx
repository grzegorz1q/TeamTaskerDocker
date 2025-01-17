import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { BarChart, BarSeriesType, PieChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { useEffect, useState } from "react";
import { ReadEmployeeDto } from "../../../Types/ReadEmployeeDto";
import GetIssuesByStatus from "../../API/Preview/GetIssuesByStatus";

function LoadingChart()
{
    return(
        <>
            <Box sx={{width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress size={70} sx={{color: "#363b4d"}}/>
            </Box>
        </>
    );
}

export default function StatisticsWidget({projectEmployees, projectId}: {projectEmployees: ReadEmployeeDto[], projectId: string | undefined})
{
    const [issuesByUser, setIssuesByUser] = useState<MakeOptional<BarSeriesType, "type">[]>([]);
    const [issuesByStatus, setIssuesByStatus] = useState<MakeOptional<BarSeriesType, "type">[]>([]);
    const [issuesDone, setIssuesDone] = useState<MakeOptional<PieValueType, "id">[]>([]);
    const [sendingState, setSendingState] = useState<boolean>(false);
    
    useEffect(() => {
        GetIssuesByStatus(setIssuesByUser, setIssuesByStatus, setIssuesDone, projectEmployees, projectId, setSendingState);
    }, []);

    return(
        <>
            <Grid item xs={4}>
                <Paper elevation={3} sx={{display: "flex", flexDirection:"column", background: "white", height: "100%", minHeight: "26rem"}}>
                    <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem", mb: "1rem"}}>
                        Issues by Status
                    </Typography>
                    {sendingState 
                    ?
                        <LoadingChart />
                    :
                        <BarChart
                        series={issuesByStatus}
                        width={550}
                        height={350}
                        colors={["#1098AD", "#255ED9", "#C930B2", "#58E82C"]}
                        xAxis={[{scaleType: 'band', data: [""]}]}
                        borderRadius={4}
                        />
                    }
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper elevation={3} sx={{display: "flex", flexDirection:"column", background: "white", height: "100%", minHeight: "26rem"}}>
                    <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem", mb: "1rem"}}>
                        Issues Done Overall
                    </Typography>
                    {sendingState
                    ?
                        <LoadingChart/>
                    :
                        <PieChart
                        series={[
                            {
                            data: issuesDone,
                            },
                        ]}
                        width={500}
                        height={280}
                        colors={["#58E82C", "#1098AD"]}
                        />
                    }
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper elevation={3} sx={{display: "flex", flexDirection:"column", background: "white", height: "100%", minHeight: "26rem"}}>
                    <Typography variant="h6" fontWeight={550} sx={{marginRight: "auto", ml: "1.5rem", mt: "1rem", mb: "1rem"}}>
                        Issues Done by User
                    </Typography>
                    {sendingState 
                    ?
                        <LoadingChart/>
                    :
                        <BarChart
                        series={issuesByUser}
                        width={550}
                        height={350}
                        xAxis={[{scaleType: 'band', data: [""]}]}
                        borderRadius={4}
                        slotProps={{
                            legend: {hidden: true}
                        }}
                        />
                    }
                </Paper>
            </Grid>
        </>
    );
}