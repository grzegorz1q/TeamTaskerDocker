import { Box, Button, CircularProgress, FormControl, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { CreateTeamForm } from "../../Types/CommonTypes";
import { FormLabel, Input } from "@mui/joy";
import CreateTeamEmployeesSelect from "./Forms/CreateTeamEmployeesSelect";
import { CreateTeamRequest } from "./TeamsApi";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";

function onSubmit(formikValues: CreateTeamForm, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const teamToCreate: CreateTeamForm = {
        name: formikValues.name,
        leaderId: formikValues.leaderId
    }

    console.log(formikValues.name);

    CreateTeamRequest(teamToCreate, setSendingState, sendSucess);
}

function CreateTeamContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<CreateTeamForm>();

    return(
        <>
            <Form>
                <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
                    <Grid container spacing={12}>

                        <Grid item xs={12} sx={{display: "flex"}}>
                            <Button onClick={() => {location.href = "/admindashboard/manageteams";}}>
                                <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                            </Button>
                            <Typography variant="h4">
                                Create Team
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Name a team: 
                                        </Typography>
                                            <FormControl>
                                                <Input id="name" value={formikProps.values.name} onChange={formikProps.handleChange} placeholder="Team's name" sx={{minWidth: "18rem"}}/>
                                            </FormControl>
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a Lead:
                                        </Typography>
                                        <CreateTeamEmployeesSelect FormikValue={formikProps.values.leaderId} formikSetValue={formikProps.setFieldValue} idName="leaderId"/>
                                    </FormLabel> 
                                </Grid>

                                <Grid item xs={4}>
                                    {formikProps.values.leaderId != null && formikProps.values.name != null 
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

export default function CreateTeam()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{name: "", leaderId: 0}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess)}}
            >
                <CreateTeamContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}