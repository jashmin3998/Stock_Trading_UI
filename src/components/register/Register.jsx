import React, { useState } from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { useNavigate} from 'react-router-dom';
import { registerUser } from '../../services';
//import AuthenticationService from './AuthenticationService.js'

function Register(){

    const [firstname, setFirstname] = useState("")
    const[lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [error, setError] = useState("")
    const [isRegistered, setIsRegistered] =useState(false)
    const navigate = useNavigate()

    const handleUsernameChange=(event) =>{

        if(event.target.value === ""){
            setError("!Username cannot be empty")
        }
        else{
            setUsername(event.target.value)
        }
        
    }

    const handlePasswordChange=(event) =>{
         
        if(event.target.value === ""){
            setError("!Password cannot be empty")
        }
        else{
            setPwd(event.target.value)
        }
    }

    const handleFirstnameChange=(event) =>{
        if(event.target.value === ""){
            setError("!First Name cannot be empty")
        }
        else{
            setFirstname(event.target.value)
        }
         
    }

    const handleLastnameChange=(event) =>{
        if(event.target.value === ""){
            setError("!Last Name cannot be empty")
        }
        else{
            setLastname(event.target.value)
        }
        
        
    }

    const handleEmailChange=(event) =>{
        
        if(event.target.value === ""){
            setError("!Email cannot be empty")
        }
        else{
            setEmail(event.target.value) 
        }
    }

    async function registerClicked(){

        try {

            if(firstname === ""|| lastname  === "" || email  === "" || username  === "" || pwd  === ""){
                setError("! All the details are medatory.")
                return;
            }
            
            const response = await registerUser({
                firstname,
                lastname,
                email,
                username,
                pwd,
                userRole : "USER"
            })

            if(response.data.success){
                setError("")
                setIsRegistered(true)
                //navigate("/login")
            }
            else{
                setIsRegistered(false)
                setError("Registeration Failed")
            }
        
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.error){
                setIsRegistered(false)
                setError(error.response.data.error)
            }
        }

    }

    function clickedPopup(){

    }




    return(
        
        <div className='Register d-flex flex-column align-items-center'>
            
            {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
            <div className='row col-2 mt-5'>
                First Name: <input type="text" name="firstname" value={firstname} onChange={handleFirstnameChange} />
            </div>
            <div className='row col-2 mt-2'>
                Last Name: <input type="text" name="lastname" value={lastname} onChange={handleLastnameChange} />
            </div>
            <div className='row col-2 mt-2'>
                Email : <input type="email" name="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className='row col-2 mt-2'>
                User Name: <input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className='row col-2 mt-2'>
                Password: <input type="password" name="pwd" value={pwd} onChange={handlePasswordChange} />
            </div>
            <div className='row col-2 mt-4'>
                <button className="btn btn-success" onClick={registerClicked}>Register</button>
            </div>
            {error && <div className='text-danger my-3'>{error}</div>}
            {isRegistered && 
            <div className='text-success my-3' >
                Registered Successfully
            </div>
            }
        </div>
    )
        
    
}

export default Register;

