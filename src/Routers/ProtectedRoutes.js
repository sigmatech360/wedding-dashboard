import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        
        let token = localStorage.getItem('admintoken');
        if (!token) {
            navigate('/login');
        }
        else if(location.pathname == '/'){
            navigate('/dashboard');

        }
    })
    return (
        <>
            <Components />
        </>
    )
}
