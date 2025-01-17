import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik } from "formik";
import { useState } from "react";
import { FormLabel } from "@mui/joy";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import ResetPasswordUserSelect from "./ResetPasswordUserSelect";

// function onSubmit(formikValues: any, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
// {


//     //CreateTeamRequest(teamToCreate, setSendingState, sendSucess);
// }

function ResetPasswordContent({sendingState}: {sendingState: boolean})
{
    //const formikProps = useFormikContext<string>();

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
                                Reset Password
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a User:
                                        </Typography>
                                        <ResetPasswordUserSelect FormikValue={1} formikSetValue={undefined} idName="user"/>
                                    </FormLabel> 
                                </Grid>

                                <Grid item xs={4}>
                                    {false
                                    ?
                                    sendingState != true ? <Button type="submit" sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Reset</Button> : <CircularProgress/>
                                    :
                                    <Button disabled sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Reset</Button>
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

export default function ResetPassword()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    setSendingState(false);
    setSendSucess(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{}}
            onSubmit={(/*values*/) => {/*onsole.log(values), onSubmit(values, setSendingState, setSendSucess)*/}}
            >
                <ResetPasswordContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}