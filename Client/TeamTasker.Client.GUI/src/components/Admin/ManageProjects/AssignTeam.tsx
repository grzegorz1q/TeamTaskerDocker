import { Box, Button, CircularProgress, FormControl, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { FormLabel} from "@mui/joy";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import { AssignTeamRequest } from "./ProjectsApi";
import { AddTeamToProjectDto } from "../../Types/AddTeamToProjectDto";
import AssignTeamSelectTeams from "./Forms/AssignTeamSelectTeams";
import AssignTeamSelectProjects from "./Forms/AssignTeamSelectProjects";

function onSubmit(formikValues: AddTeamToProjectDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
{
     const projectToCreate: AddTeamToProjectDto = {
         Id: formikValues.Id,
         TeamId: formikValues.TeamId
     }

     AssignTeamRequest(projectToCreate, setSendingState, sendSucess);
}

function AssignTeamContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<AddTeamToProjectDto>();

    return(
        <>
            <Form>
                <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
                    <Grid container spacing={12}>

                        <Grid item xs={12} sx={{display: "flex"}}>
                            <Button onClick={() => {location.href = "/admindashboard/manageprojects";}}>
                                <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                            </Button>
                            <Typography variant="h4">
                                Assign Team
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography>
                                            Select Project
                                        </Typography>
                                        <FormControl>
                                            <AssignTeamSelectProjects FormikValue={formikProps.values.Id} formikSetValue={formikProps.setFieldValue} idName={"Id"}/>
                                        </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography>
                                            Select Team
                                        </Typography>
                                        <FormControl>
                                            <AssignTeamSelectTeams FormikValue={formikProps.values.TeamId} formikSetValue={formikProps.setFieldValue} idName={"TeamId"}/>
                                        </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    {formikProps.values.Id != null && formikProps.values.TeamId
                                    ?
                                    sendingState != true ? <Button type="submit" sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button> : <CircularProgress/>
                                    :
                                    <Button disabled sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button>
                                    }
                                </Grid>
                                
                            </Grid>
                        </Grid>

                        {/* Guarantees new line */}
                        <Grid item xs={9}></Grid> 

                    </Grid>
                </Box>
            </Form>
        </>
    );
}

export default function AssignTeam()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{Id: 0, TeamId: 0}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess)}}
            >
                <AssignTeamContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}