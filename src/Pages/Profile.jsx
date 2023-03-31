import { useState } from "react"
import axios from "axios"


export default function Profile(props) {

    const { id, details } = props

    

    // __________Update User's Account Data From Database___________

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelSubmit = async (event) => {
        event.preventDefault()

        let token = localStorage.getItem('jwt')
        token = token.replace(/^"(.*)"$/, '$1');

        console.log(token)

        const headers = { 'Authorization': `Bearer ${token}` }
        const url = `http://localhost:5000/user/update/${id}`
        console.log(url)
        try {
            const data = {
                userName: userName,
                email: email,
                password: password,

            };
            const response = await axios.patch(url, data, { headers })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        window.location.reload();

    }

    return (
        <>
            <div className="profile">
                <div className="profileImage">
                    <a href=""><img src={details[0]?.profilePicture} alt="" /></a>
                    <p>{details[0]?.userName}</p>
                </div>
                <form className="details" onSubmit={handelSubmit}>
                    <div className="personDetails">
                        <label>User Name</label>
                        <input
                            type="text"
                            placeholder="New User Name"
                            value={userName}
                            onChange={(event) => {
                                setUserName(event.target.value)
                            }}
                        />
                    </div>
                    <div className="personDetails">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="New Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div className="personDetails">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>

                    <button type='submit'>Update Info</button>
                </form>
               

                
            </div>
        </>
    )
}
