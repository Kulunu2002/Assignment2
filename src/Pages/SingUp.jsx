import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//Create User

export default function SignUp() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [profilePicture, setProfilePicture] = useState('');
    const history = useHistory();

    const handelSingUpSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:5000/user/add';
        try {
            const submitData = {
                userName: userName,
                password: password,
                email: email,
                profilePicture: profilePicture,
            };
            const response = await axios.post(url, submitData);
            console.log(response);

            history.push('/RedirectLogin');

        } catch (error) {
            console.log(error);
            if (userName.length === 0 || password.length === 0 || email.length === 0) {
                throw new Error(alert('Your Details Not Valid'));
            }
        }
    };

    return (
        <>
            <div className="backgroundImage">
                <img src="./bg.jpg" alt="" id='img' />
                <div className="loginPage">
                    <h1>Don't Miss Your Works <br /> Join Us!</h1>
                    <div className="form" >
                        <form onSubmit={handelSingUpSubmit}>
                            <div className="label">
                                <label >User Name</label>
                                <input
                                    type="text"
                                    placeholder='Jhon'
                                    value={userName}
                                    onChange={(handelUserName) => {
                                        setUserName(handelUserName.target.value)
                                    }}
                                />
                            </div>
                            <div className="label">
                                <label >Password</label>
                                <input
                                    type="password"
                                    placeholder='password123%'
                                    value={password}
                                    onChange={(handelPassword) => {
                                        setPassword(handelPassword.target.value)
                                    }}
                                />
                            </div>
                            <div className="label">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder='Example@gmail.com'
                                    value={email}
                                    onChange={(handleEmail) => {
                                        setEmail(handleEmail.target.value)
                                    }}
                                />
                            </div>
                            <div className="label">
                                <label>Profile Picture</label>
                                <input
                                    type="text"
                                    placeholder='Network Image'
                                    value={profilePicture}
                                    onChange={(handleProfilePicture) => {
                                        setProfilePicture(handleProfilePicture.target.value)
                                    }}
                                />
                            </div>

                            <button type='submit'>SingUp</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
