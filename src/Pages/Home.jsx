import React from 'react'
import { Link } from 'react-router-dom'
import NewNote from '../Component/NewNote'
import Note from '../Component/Note'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home(props) {
    const { setAddNoteForm, setCalendar, setEditNote , details } = props

    // __________Delete User's Data From Database And Display Data___________

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            let token = localStorage.getItem('jwt')

            token = token.replace(/^"(.*)"$/, '$1');

            console.log("user Toke>>>", token)

            const headers = { 'Authorization': `Bearer ${token}` }
            console.log("headers>>>", headers)

            const url = "http://localhost:5000/Notes/get/me";

            const { data } = await axios.get(url, { headers });
            setNotes(data);

            console.log("Notes>>>>", data);

            

        };
        fetchData();
    }, []);

   

    return (
        <>
            <div className="NavBar">
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/3082/3082827.png" alt="To-Do Logo" />
                    <h1>TO-DO APP</h1>
                </div>

                <div className="searchBar">
                    <input type="text" placeholder='Search' />
                    <a href='#'><i class="bi bi-search"></i></a>
                </div>
                <div className="flotRight">
                    <div className="notification">
                        <a href='#'><i class="bi bi-bell"></i></a>
                    </div>
                    <div className="profilePic">
                        <Link to="/Profile">
                            <img src={details[0]?.profilePicture} alt="Profile" />
                        </Link>

                    </div>
                </div>
            </div>
            <span onClick={() => setAddNoteForm(true)} className="add-btn"><i className="bi bi-plus-circle"></i></span>

            <div className='grid'>
                {notes.map((list) => (
                    <Note key={list._id} id={list._id} title={list.title} note={list.note} owner={list.owner} setCalendar={setCalendar} setEditNote={setEditNote} />
                ))}
            </div>


            <NewNote />

        </>
    )
}
