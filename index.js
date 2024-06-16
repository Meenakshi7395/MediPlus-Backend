import express, {json} from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mediplus_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

mongoose.connect('mongodb+srv://mediplus_user:mediplus_user@mediplus.6px1ycb.mongodb.net/mediplus_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



import users from "./routes/users.js"
import patients from "./routes/patients.js"
import medicines from "./routes/medicines.js"
import incidents from "./routes/incidents.js"
import OPDs from "./routes/OPDs.js"
import prescriptions from "./routes/prescription.js"

app.use(bodyParser.json());

var homePage = `
<h1>Welcome to Mediplus</h1>
<h2>A Patient management system with following main features</h2>
<ul>
<li>Patient Record Management</li>
<li>A Patient can visit the clinic in several medical conditions, the Option of managing Incidents groups all the visits for each case of patient.</li>
<li>For a given incident there might be several OPDs of the patient, this is possible with our OPD management system which also allows to print the digital prescription in PDF </li>
<li>We also have provided a feature to manage the medicines available in the clinic. The same are visible during adding prescriptions.
</ul>
<p>This is Backend API System for Mediplus and is integerated in Frontend Developed in React</p>
<p>Please click <a href="https://mediplus-frontend.onrender.com">here</a> For Better User Experience</p>
<p>Thanks for checking it out</p>
`


app.get('/',(req,res) => {
    // res.send({name:"Hello world"})
    res.send(homePage);

});

// Routes
app.use('/users', users);
app.use('/patients', patients);
app.use('/medicines', medicines);
app.use('/incidents', incidents);
app.use('/OPDs', OPDs);
app.use('/prescriptions', prescriptions);

app.listen(PORT,()=> console.log(`server runnig on http://localhost:${PORT}`));