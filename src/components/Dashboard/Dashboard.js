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
import AccidentsTable from "../AccidentsTable/AccidentsTable";
import { getAllData, deleteAllData } from '../../actions/data';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [dataImported, setDataImported] = useState(false);
    const [loading, setLoading] = useState(false);

    const importData = async () => {
        const req = await dispatch(getAllData());
        setLoading(true);
        if (req) {
            setDataImported(true);
            setLoading(false);
        }

    }

    const deleteAllData = async () => {
        await dispatch(deleteAllData());
        setDataImported(false);
    }

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };



    return (
        <>
            {
                dataImported ? (
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item md={5} sm={5} xs={12} align="center">
                            <Box sx={{ minWidth: 275 }}>
                                <Button variant="outlined" sx={{ width: "40%", color: "black", borderColor: "black" }}
                                    onClick={() => deleteAllData()}>Delete All Data</Button>
                            </Box>
                        </Grid>
                        <AccidentsTable />
                    </Grid>
                ) : (
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item md={5} sm={5} xs={12} align="center">
                            <Box sx={{ minWidth: 275, marginTop: "50px" }}>
                                <Button variant="outlined" sx={{ width: "40%", color: "black", borderColor: "black" }}
                                    onClick={() => importData()}>Import Data</Button>
                            </Box>
                            
                        </Grid>
                        {
                            loading ? (
                                <Typography variant="body1" gutterBottom>
                                    This could take a while, please be patient.
                                </Typography>
                            ) : (
                                <></>
                            )
                        }
                        <AccidentsTable />
                    </Grid>
                )
            }
        </>
    );
}