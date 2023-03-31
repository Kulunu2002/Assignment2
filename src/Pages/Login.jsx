import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import axios from 'axios'
import { useState } from 'react'


function Login(props) {

    //  _________verifies the identity of a user__________

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handelSubmit = async (event) => {
        event.preventDefault()
        const url = "http://localhost:5000/user/login"
        try {
            const submitData = {
                email: email,
                password: password
            }
            const data = await axios.post(url, submitData)
            console.log(data)

            localStorage.setItem('jwt', JSON.stringify(data.data.token))

    // If the login was successful, redirect the user to the home page
            props.history.push('/home')


        } catch (error) {
            console.log(error)
            throw new Error(alert("Email Or Password Invalid"))
        }
    // To refresh the page after changing the URL to "/home",
        window.location.reload();

    }
    return (
        <>
            <div className="backgroundImage">
                <img src="./bg.jpg" alt="" id='img' />
                <div className="loginPage">

                    <h1>Welcome Back!</h1>
                    <div className="form" >
                        <form onSubmit={handelSubmit}>
                            <div className="label">
                                <label >Email</label>
                                <input
                                    type="text"
                                    placeholder='Example@gmail.com'
                                    value={email}
                                    onChange={(handelEmail) => {
                                        setEmail(handelEmail.target.value)
                                    }}
                                />
                            </div>
                            <div className="label">
                                <label >Password</label>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(handlePassword) => {
                                        setPassword(handlePassword.target.value)
                                    }}
                                />
                            </div>

                            <button type='submit'>Login</button>
                        </form>
                    </div>
                    <p>_______Or_______</p>
                    <div className="newUser">
                        <p>Login With</p>
                        <div className="socialMedia">
                            <SocialIcon url="https://twitter.com/jaketrent" />
                            <SocialIcon url="https://facebook.com/jaketrent" />
                            <SocialIcon url="https://google.com" />
                        </div>
                        <p>Don't Have An Account Yet?</p>
                        <Link to='/SingUp'>Create New Account</Link>
                    </div>
                </div>
                <p>Copyright © 2023 To-Do App. All Rights Reserved.</p>
            </div>
        </>
    )
}

export default withRouter(Login);
