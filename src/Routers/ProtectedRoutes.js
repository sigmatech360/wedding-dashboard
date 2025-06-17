import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    })
    return (
        <>
            <Components />
        </>
    )
}
