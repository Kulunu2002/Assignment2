import React from 'react';

export default function Note(props) {
  const { setCalendar, id ,setEditNote } = props;

// __________Delete User's Data From Database___________

  const handleDelete = (event) => {
    event.preventDefault();

    const url = `http://localhost:5000/notes/delete/${id}`;

    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (!response.deleted) {
          throw new Error(alert('Something went wrong'));
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  return (
    <>
      <div className="to-do">
        <div className="list">
          <h2>{props.title}</h2>
          <p>{props.note}</p>
          <div className="actions">
            
            <span onClick={()=>setEditNote(true)}>
              <i className="bi bi-pencil"></i>
            </span>

            <span onClick={() => setCalendar(true)}>
              <i className="bi bi-calendar3"></i>
            </span>
            
            <span onClick={handleDelete}>
              <i className="bi bi-trash3"></i>
            </span>
          </div>
        </div>
      </div>

    </>
  );
}
