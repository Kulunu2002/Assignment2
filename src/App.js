import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewNote from './Component/NewNote'
import SingUp from './Pages/SingUp';
import Calendar from './Component/Calender';
import Profile from './Pages/Profile';
import EditNote from './Component/EditNote';
import axios from 'axios';
import RedirectLogin from './Pages/RedirectLogin';

function App() {

   // __________Get User's Account Data From Database___________

   const [details, setDetails] = useState([]);

   useEffect(() => {
       const fetchData = async () => {
           let token = localStorage.getItem('jwt')

           token = token.replace(/^"(.*)"$/, '$1');

           const headers = { 'Authorization': `Bearer ${token}` }
           const url = "http://localhost:5000/User/get/me";

           const { data } = await axios.get(url, { headers });
           setDetails(data);
          //  console.log("Details>>>>", data);

           {
               details.map((e) => {
                   <Calendar id={e._id} />
               })
               details.map((e) => {
                   <Profile profilePicture={e.profilePicture} />
               })
           }
       };
       fetchData();
   }, []);

  // NewNote

  const [addNoteForm, setAddNoteForm] = useState(false)

  function add() {
    setAddNoteForm(!addNoteForm)
  }

  // Edit Note

  const [editNote, setEditNote] = useState(false)

  function edit() {
    setEditNote(!editNote)
  }

  // _________calendar________

  const [calendar, setCalendar] = useState(false)

  function cal() {
    setCalendar(!calendar)
  }

  return (

    <Router>
      {editNote && <EditNote edit={edit} />}
      {addNoteForm && <NewNote add={add} />
      }
      {calendar && <Calendar cal={cal}/>}
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/singUp">
          <SingUp />
        </Route>
        <Route path="/home">
          <Home setAddNoteForm={setAddNoteForm} setCalendar={setCalendar} setEditNote={setEditNote} details={details}/>
        </Route>
        <Route exact path="/Profile" >
        <Profile  details={details} />
        </Route>
        <Route path="/RedirectLogin">
          <RedirectLogin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
