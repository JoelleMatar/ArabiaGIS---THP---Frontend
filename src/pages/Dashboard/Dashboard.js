import * as React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function MainPage() {
    const [LoggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();

    return(
        <>
            <Navbar />
            <Dashboard />
        </>
    )
};
