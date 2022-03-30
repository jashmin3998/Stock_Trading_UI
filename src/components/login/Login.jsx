import React, { useState } from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Route , withRouter, useNavigate} from 'react-router-dom';
import { getUserRole, loginUser } from '../../services';

//import AuthenticationService from './AuthenticationService.js'

function Login(){

    const[username, setUsername] = useState("JashminPatel")
    const[pwd, setPassword] = useState("jass123")
    const [error, setError] = useState("")
    const[isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    

    const handleUsernameChange=(event) =>{
        setUsername(event.target.value) 
    }

    const handlePasswordChange=(event) =>{
        setPassword(event.target.value) 
    }


    async function loginClicked(){
        try {
            const response = await loginUser({
                username,
                pwd
            })

            const res = await getUserRole(
                { params: { username: username } }
            );    
            if(res){
                console.log(res.data)
                if(res.data === "ADMIN"){
                    window.localStorage.setItem("isAdmin", true)
                }
                
                
            }

            if(response.data.success){
                console.log(response.data)
                setError("Login Successfully")
                window.localStorage.setItem("username", username)
                navigate('/home')
                
            }
            else{
                console.log(response.data)
                setError("Login Failed")
            }
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.error){
                console.log(error.response.data.error)
                setError(error.response.data.error)
            }
        }
    }




    return(
        <div className='Login d-flex flex-column align-items-center'>
            <div className='row col-2 mt-2'>
                User Name: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className='row col-2 mt-2'>
                Password: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="password" name="password" value={pwd} onChange={handlePasswordChange} />
            </div>
            
            <button className="btn btn-success my-2" onClick={loginClicked}>Login</button>
            {error&&<div className='text-danger'> {error} </div>}
        </div>

        
    )
        
    
}

export default Login;

