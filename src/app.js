const express = require("express");
require("./db/conn");
const app = express();
const port = process.env.PORT || 8000;
const studentroute = require("./routes/studentrout");
app.use(express.json());
app.use("/students", studentroute);

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})