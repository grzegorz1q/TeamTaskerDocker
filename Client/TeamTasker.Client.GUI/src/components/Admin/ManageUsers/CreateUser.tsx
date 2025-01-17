import { Box, Button, CircularProgress, FormControl, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { FormLabel, Input } from "@mui/joy";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import { CreateUserDto } from "../../Types/CreateUserDto";
import { CreateUserRequest } from "./UsersApi";

function onSubmit(formikValues: CreateUserDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const userToCreate: CreateUserDto = {
        firstName: formikValues.firstName,
        lastName: formikValues.lastName,
        email: formikValues.email,
        position: formikValues.position
    }

    CreateUserRequest(userToCreate, setSendingState, setSendSucess);
}

function CreateUserContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<CreateUserDto>();

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
                                Create User
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            First name:
                                        </Typography>
                                            <FormControl>
                                                <Input id="firstName" value={formikProps.values.firstName} onChange={formikProps.handleChange} placeholder="ex. John" sx={{minWidth: "18rem"}}/>
                                            </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Last name:
                                        </Typography>
                                            <FormControl>
                                                <Input id="lastName" value={formikProps.values.lastName} onChange={formikProps.handleChange} placeholder="ex. Smith" sx={{minWidth: "18rem"}}/>
                                            </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            E-mail address:
                                        </Typography>
                                            <FormControl>
                                                <Input id="email" value={formikProps.values.email} onChange={formikProps.handleChange} placeholder="example@email.net" sx={{minWidth: "18rem"}}/>
                                            </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Position:
                                        </Typography>
                                            <FormControl>
                                                <Input id="position" value={formikProps.values.position} onChange={formikProps.handleChange} placeholder="ex. Frontend Developer" sx={{minWidth: "18rem"}}/>
                                            </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    {formikProps.values.firstName !== "" && formikProps.values.lastName !== "" && formikProps.values.email !== "" && formikProps.values.position !== "" 
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

export default function CreateUser()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{firstName: "", lastName: "", email: "", position: ""}}
            onSubmit={(values) => {
                console.log(values), onSubmit(values, setSendingState, setSendSucess);
                values.firstName = "";
                values.lastName = "";
                values.email = "";
                values.position = "";
            }}
            >
                <CreateUserContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}