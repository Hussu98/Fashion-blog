const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const blogController = require('./fashionBlogController');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(bodyParser.json());
//app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({
    origin: 'https://fashion-store-snowy-delta.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('File uploaded: ', path.join(__dirname, 'uploads'))

blogController(app)

const PORT = process.env.SERVER_PORT || 5000;

app.listen(5000, () => console.log("Express is listening to port 5000"))