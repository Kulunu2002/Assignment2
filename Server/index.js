require("./db/mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const noteRouter = require("./routes/Notes");
const userRouter = require("./routes/User")

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(noteRouter);
app.use(userRouter);

const port =5000;

app.listen(port, () => {
    console.log("server is up and running on port" + port)
})