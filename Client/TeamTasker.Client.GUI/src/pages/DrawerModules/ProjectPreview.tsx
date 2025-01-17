import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckLeaderPermission from "../../components/Connection/API/CheckLeaderPermission";
import { ReadProjectDto } from "../../components/Types/ReadProjectDto";
import { GetCurrentProjectInfo } from "../../components/Modules/API/GetCurrentProjectInfo";
import { ReadEmployeeDto } from "../../components/Types/ReadEmployeeDto";
import { GetProjectEmployees } from "../../components/Modules/API/GetProjectEmployees";
import GettingStartedWidget from "../../components/Modules/Preview/Widgets/GettingStartedWidget";
import ProjectStatusWidget from "../../components/Modules/Preview/Widgets/ProjectStatusWidget";
import ProjectDescriptionWidget from "../../components/Modules/Preview/Widgets/ProjectDescriptionWidget";
import MembersWidget from "../../components/Modules/Preview/Widgets/MembersWidget";
import StatisticsWidget from "../../components/Modules/Preview/Widgets/StatisticsWidget";

export default function ProjectPreview({projectId}: {projectId: string | undefined})
{
    const temp: ReadProjectDto = {
        id: 0,
        name: "",
        status: "default",
        description: "",
        deadline: "",
        isComplete: false,
        teamId: 0,
        picture: "",
        comments: []
    }

    const [project, setProject] = useState<ReadProjectDto>(temp);
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [projectEmployees, setProjectEmployees] = useState<ReadEmployeeDto[]>([]);
    sendSucess;

    const [leaderPermission, setLeaderPermission] = useState<boolean>(false);
    CheckLeaderPermission(setLeaderPermission);

    useEffect(() => {
        GetCurrentProjectInfo(projectId, setProject, setSendingState, setSendSucess);
        GetProjectEmployees(projectId, setProjectEmployees);
    }, []);

    if(projectId == undefined)
        return(
        <>403 - There is an invalid project id in the url.</>
    );

    //TODO: Make na assets file with hard coded values

    const images = 
    [
      "https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg", 
      "https://picsum.photos/seed/picsum/200/300", 
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
    ];
  
    var index = 0;
  
    switch (projectId) {
      case "1":
        index = 0;
        break;
    
      case "2":
        index = 1;
        break;
  
      case "3":
        index = 2;
        break;
  
      default:
        index = 3;
        break;
    }

    return(
        <>
            <Box sx={{width: "100%", height: "95%", mt: "5rem", marginLeft: "6rem"}}>
                <Box sx={{display: "flex", mb: "1.5rem"}}>
                    <Typography variant="h4" sx={{marginRight: "auto"}}>
                        Preview
                    </Typography>
                </Box>

                <Grid container spacing={2}>

                        {/*Project banner*/}
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{height: "20rem", background: "lightgray"}}>
                                <img alt="This is a place for your project's banner." src={images[index]} style={{width: "100%", height: "100%"}}/>
                            </Paper>
                        </Grid>

                        {/*Getting Started*/}
                        <Grid item xs={6}>
                            <GettingStartedWidget />
                        </Grid>

                    <Grid item xs={6}>
                        {/*Project Status*/}
                        <ProjectStatusWidget project={project} sendingState={sendingState} />

                        {/*Project Desc*/}
                        <ProjectDescriptionWidget project={project}/>

                        {/*Project Members*/}
                        <MembersWidget projectEmployees={projectEmployees} leaderPermission={leaderPermission} />
                    </Grid>

                    {/*Statistics - Grid item inside the component*/}
                    {sendingState ? <></> : <StatisticsWidget projectId={projectId} projectEmployees={projectEmployees}/>}

                </Grid>
            </Box>
        </>
    );
}