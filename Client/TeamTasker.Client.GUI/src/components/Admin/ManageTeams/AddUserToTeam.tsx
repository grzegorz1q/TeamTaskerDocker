import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormLabel } from "@mui/joy";
import UsersSelect from "./Forms/UsersSelect";
import { Formik, Form, FormikValues, useFormikContext } from "formik";
import { AddUserToTeamForm } from "../../Types/CommonTypes";
import TeamsSelect from "./Forms/TeamsSelect";
import { useState } from "react";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import { AddUserToTeamRequest } from "./TeamsApi";
import React from "react";

function onSubmit(formikValues: FormikValues, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const userToAdd: AddUserToTeamForm = {
        employeeId: formikValues.employeeId,
        teamId: formikValues.teamId
    }

    AddUserToTeamRequest(userToAdd, setSendingState, sendSucess);
}

function AddUserToTheTeamContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<AddUserToTeamForm>();
    console.log(formikProps.values.employeeId)
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
                                Add User To The Team
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={5}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a Team: 
                                        </Typography>
                                        <TeamsSelect FormikValue={formikProps.values.teamId} formikSetValue={formikProps.setFieldValue} idName="teamId"/>
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a User: 
                                        </Typography>
                                        <UsersSelect FormikValue={formikProps.values.employeeId} formikSetValue={formikProps.setFieldValue} idName="employeeId"/>
                                    </FormLabel> 
                                </Grid>

                                <Grid item xs={4}>
                                    {formikProps.values.employeeId != null && formikProps.values.teamId != null 
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

export default function AddUserToTheTeam()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{employeeId: 0, teamId: 0}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess)}}
        >
                <AddUserToTheTeamContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}