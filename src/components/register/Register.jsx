import React, { useState } from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { useNavigate} from 'react-router-dom';
import { registerUser } from '../../services';
//import AuthenticationService from './AuthenticationService.js'

function Register(){

    const [firstname, setFirstname] = useState("Jashmin")
    const[lastname, setLastname] = useState("Patel")
    const [username, setUsername] = useState("jass3998")
    const[email, setEmail] = useState("jass@gmail.com")
    const [pwd, setPwd] = useState("jass123")
    const [error, setError] = useState("")
    const [isRegistered, setIsRegistered] =useState(false)
    const navigate = useNavigate()

    const handleUsernameChange=(event) =>{
        setUsername(event.target.value) 
    }

    const handlePasswordChange=(event) =>{
        setPwd(event.target.value) 
    }

    const handleFirstnameChange=(event) =>{
        setFirstname(event.target.value) 
    }

    const handleLastnameChange=(event) =>{
        setLastname(event.target.value) 
    }

    const handleEmailChange=(event) =>{
        setEmail(event.target.value) 
    }

    async function registerClicked(){

        try {
            const response = await registerUser({
                firstname,
                lastname,
                email,
                username,
                pwd,
                userRole : "USER"
            })

            if(response.data.success){
                setIsRegistered(true)
                navigate("/login")
            }
            else{
                setError("Registeration Failed")
            }
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.error){
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
            {error && <div>{error}</div>}
            {isRegistered && 
            <div class="popup" onclick={clickedPopup}>
                <span class="popuptext" id="myPopup">Registered Successfully</span>
            </div>
            }
        </div>
    )
        
    
}

export default Register;

