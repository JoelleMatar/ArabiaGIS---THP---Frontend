import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { signin, signup } from '../../actions/user';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Navigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const [newUser, setNewUser] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const newAcc = () => {
        setNewUser(true);
    }

    const haveAcc = () => {
        setNewUser(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const formikLogin = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        onSubmit: values => {
            try {
                const response = dispatch(signin(values));

                if (response) {
                    navigate('/dashboard');
                    setTimeout(function () {
                        setOpen(true);
                    }, 2000);
                }
            }
            catch (err) {
                console.log(err);
            }

        },
    });

    const formikRegister = useFormik({
        initialValues: {
            password: '',
            email: '',
            username: ''
        },
        onSubmit: values => {
            try {
                const response = dispatch(signup(values));

                if (response) {
                    navigate('/dashboard');
                    setTimeout(function () {
                        setOpen(true);
                    }, 2000);
                }
            }
            catch (err) {
                console.log(err);
            }

        },
    });

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item md={4} sm={6} xs={12} align="center">
                <Box sx={{ minWidth: 275 }}>
                    {
                        newUser ? (
                            <>
                                <Card variant="outlined" sx={{marginTop: "120px"}}>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom component="div">
                                            Welcome To Accidents Manager
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Please Register to Become a Member
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <form onSubmit={formikRegister.handleSubmit}>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item md={10} sm={10} xs={12} sx={{ marginBottom: "20px" }}>
                                                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth="100%"
                                                        name="email" type="email" onChange={formikRegister.handleChange} value={formikRegister.values.email} />
                                                </Grid>
                                                <Grid item md={10} sm={10} xs={12} sx={{ marginBottom: "20px" }}>
                                                    <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth="100%"
                                                        name="username" onChange={formikRegister.handleChange} value={formikRegister.values.username} />
                                                </Grid>
                                                <Grid item md={10} sm={10} xs={12} sx={{ marginBottom: "20px" }}>
                                                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth="100%"
                                                        name="password" type="password" onChange={formikRegister.handleChange} value={formikRegister.values.password} />
                                                </Grid>
                                                <Button variant="outlined" sx={{ width: "30%", color: "black", borderColor: "black" }}
                                                    type="submit">Register</Button>
                                            </Grid>
                                        </form>
                                    </CardContent>
                                    <CardActions sx={{ float: "right" }}>
                                        <Button size="small" onClick={() => haveAcc()}>Already Have An Account?</Button>
                                    </CardActions>
                                </Card>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} align="center">
                                    <Alert onClose={handleClose} severity="success">
                                        Successfully Registered!
                                    </Alert>
                                </Snackbar>
                            </>
                        ) : (
                            <>
                                <Card variant="outlined"  sx={{marginTop: "150px"}}>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom component="div">
                                            Welcome Back!
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Please Login to Your Account
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <form onSubmit={formikLogin.handleSubmit}>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item md={10} sm={10} xs={12} sx={{ marginBottom: "20px" }}>
                                                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth="100%"
                                                        name="email" type="email" onChange={formikLogin.handleChange} value={formikLogin.values.email} />
                                                </Grid>
                                                <Grid item md={10} sm={10} xs={12} sx={{ marginBottom: "20px" }}>
                                                    <TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth="100%"
                                                        name="password" onChange={formikLogin.handleChange} value={formikLogin.values.password} />
                                                </Grid>
                                                <Button variant="outlined" sx={{ width: "30%", color: "black", borderColor: "black" }}
                                                    type="submit">Login</Button>
                                            </Grid>
                                        </form>
                                    </CardContent>
                                    <CardActions sx={{ float: "right" }}>
                                        <Button size="small" onClick={() => newAcc()}>Don't Have an Account?</Button>
                                    </CardActions>
                                </Card>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success">
                                        Successfully Logged In!
                                    </Alert>
                                </Snackbar>
                            </>
                        )
                    }

                </Box>
            </Grid>


        </Grid>
    );
}