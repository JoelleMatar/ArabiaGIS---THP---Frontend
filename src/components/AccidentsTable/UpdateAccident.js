import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { useEffect, useState } from 'react';
import { fetchAccident, updateAccidentData } from '../../actions/data';
import { useFormik } from 'formik';

export default function UpdateAccident({ setUpdated, open, close, accidentInfo, accidentInformation, setaccidentInformation }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accident, setAccident] = useState({});

    console.log("accidentInfo", accidentInfo.accident_index)

    const handleChange = (event) => {
        setaccidentInformation({ ...accidentInformation, [event.target.name]: event.target.value });

        console.log("event.target name", event.target.name);
        console.log("event.target value", event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("accidentInfo", accidentInformation);
        const response = dispatch(updateAccidentData(accidentInformation.accident_index, accidentInformation));

        if (response) {
            setUpdated(true);
            console.log("success update");
        }
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Update Accident</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>

                        <Grid container>

                            <Grid item md={6} sm={6} xs={12}>
                                <TextField
                                    variant="standard" size="small" label="Severity" type="number" value={accidentInformation.accident_severity} onChange={handleChange} name="accident_severity" />
                                <TextField
                                    variant="standard" size="small" label="Casualties" type="number" value={accidentInformation.number_of_casualties} onChange={handleChange} name="number_of_casualties" />
                                <TextField
                                    variant="standard" size="small" label="Vehicules" type="number" value={accidentInformation.number_of_vehicles} onChange={handleChange} name="number_of_vehicles" />
                                <TextField
                                    variant="standard" size="small" label="Road Type" value={accidentInformation.road_type} onChange={handleChange} name="road_type" />
                                <TextField
                                    variant="standard" size="small" label="Speed Limit" type="number" value={accidentInformation.speed_limit} onChange={handleChange} name="speed_limit" />
                                <TextField
                                    variant="standard" size="small" label="Weather Condition" value={accidentInformation.weather_conditions} onChange={handleChange} name="weather_conditions" />
                                <TextField
                                    variant="standard" size="small" label="Authority District" value={accidentInformation.local_authority_district} onChange={handleChange} name="local_authority_district" />
                            </Grid>
                            <Grid item md={6} sm={6} xs={12}>
                                <TextField
                                    variant="standard" size="small" label="Date" value={accidentInformation.date} onChange={handleChange} name="date" />
                                <TextField
                                    variant="standard" size="small" label="Time" value={accidentInformation.time} onChange={handleChange} name="time" />
                                <TextField
                                    variant="standard" size="small" label="Police Force" value={accidentInformation.police_force} onChange={handleChange} name="police_force" />
                                <TextField
                                    variant="standard" size="small" label="Police Attendies" value={accidentInformation.did_police_officer_attend_scene_of_accident} onChange={handleChange} name="did_police_officer_attend_scene_of_accident" />
                                <TextField
                                    variant="standard" size="small" label="Longitude" value={accidentInformation.longitude} onChange={handleChange} name="longitude" />
                                <TextField
                                    variant="standard" size="small" label="Latitude" value={accidentInformation.latitude} onChange={handleChange} name="latitude" />
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
