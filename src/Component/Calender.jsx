import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function App(props) {
  const [date, setDate] = useState(new Date())

  return (
    <div className="over">
      <div className="app">
        <a onClick={props.cal}><i class="bi bi-x-circle"></i></a>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="text-center">
          <p>Selected Date: {date.toDateString()}</p>
        </div>
      </div>
    </div>
  )

}

export default App;