import express, {json} from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mediplus_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

import users from "./routes/users.js"
import patients from "./routes/patients.js"
import medicines from "./routes/medicines.js"
import incidents from "./routes/incidents.js"

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send({name:"Hello world"})
    // res.send("Hello world");
});

// Routes
app.use('/users', users);
app.use('/patients', patients);
app.use('/medicines', medicines);
app.use('/incidents', incidents);

app.listen(PORT,()=> console.log(`server runnig on http://localhost:${PORT}`));