import axios from 'axios'
import React, { useState } from 'react'

export default function NewNote(props) {

  const {add}=props
  
// _______Add New Note__________

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const handelSubmit = async (event) => {
    event.preventDefault()

    let token = localStorage.getItem('jwt')
    token = token.replace(/^"(.*)"$/, '$1');

    console.log(token)

    const headers = { 'Authorization': `Bearer ${token}` }
    const url = "http://localhost:5000/Notes/add"
    try {
      const data = {
        title: title,
        note: note
      };
      const response = await axios.post(url, data,{headers})
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    setTitle('')
    setNote('')
    window.location.reload();

  }

  return (
    <div className='over'>
      
        <div className="newForm">
        <a onClick={add}><i class="bi bi-x-circle"></i></a>

          <form className='addNote' onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder='Title'
              value={title}
              onChange={(handelTitle) => {
                setTitle(handelTitle.target.value)
              }}
            />
            <textarea
              type="text"
              placeholder='Note'
              value={note}
              onChange={(handelNote) => {
                setNote(handelNote.target.value)
              }}
            />
            <button type='submit'>Save</button>

          </form>
        </div>
      </div>
    
  )
}
