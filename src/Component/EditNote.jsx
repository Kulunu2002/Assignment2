import axios from 'axios'
import React, { useState  } from 'react'

export default function EditNote(props) {
  const {id } = props


  const { edit } = props


  // __________Update User's Notes From Database___________

  const [updateTitle, setUpdateTitle] = useState('')
  const [updateNote, setUpdateNote] = useState('')

  const handelUpdateSubmit = async (event) => {
    event.preventDefault()

    let token = localStorage.getItem('jwt')
    token = token.replace(/^"(.*)"$/, '$1');

    console.log(token)

    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `http://localhost:5000/notes/update/${id}`
    console.log(url)
    try {
      const data = {
        updateNote: updateNote,
        updateTitle: updateTitle
      };
      const response = await axios.patch(url, data, { headers })
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    window.location.reload();

  }


  return (
    <div className='over'>
      <div className="newForm">
        <a onClick={edit}><i class="bi bi-x-circle"></i></a>

        <form className='addNote'onSubmit={handelUpdateSubmit}>
          <input
            type="text"
            placeholder='Title'
            value={updateTitle}
            onChange={(handelTitle) => {
              setUpdateTitle(handelTitle.target.value)
            }}
          />

          <textarea
            type="text"
            placeholder='Note'
            value={updateNote}
            onChange={(handelNote) => {
              setUpdateNote(handelNote.target.value)
            }}
          />
          <button type='submit'>Update</button>

        </form>
      </div>
    </div>
  )
}
