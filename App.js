const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/dbConnect');
const apiRoutes = require('./routes/apiRoutes');
const cors = require("cors"); 
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

connectDB();

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
