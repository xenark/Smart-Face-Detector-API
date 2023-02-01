import express from 'express';
import bcrypt from 'bcryptjs'
import cors from 'cors';
import knex from 'knex';
import { Register } from './Controllers/Register.js';
import { Signin } from './Controllers/Signin.js';
import { Profile } from './Controllers/Profile.js';
import { Entries, ImageApiCall } from './Controllers/Images.js';


//initializing express middleware
export const routes = express();
//end

//body parser to parse req.body to json and other formats
// routes.use(express.urlencoded({extended: false}));
routes.use(express.json());
//end

//cors allow secure access to the frontend
routes.use(cors());
//end


//using knex to connect to our database
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'nocode',
        database: 'smartbrain'
    }
});

//end

routes.post('/register',  Register(db, bcrypt));

routes.post('/signin', (req, res) => { Signin(db, bcrypt, req, res) });

routes.get('/profile/:id', (req, res) => { Profile(db, req, res) });

routes.put('/images', (req, res) => { Entries(db, req, res) })

routes.post('/imageurl', (req, res) => { ImageApiCall(req, res) })

