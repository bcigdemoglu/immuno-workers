"use strict";

import express from 'express';
import path from 'path';
import uuid from 'uuid';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const candidates = {};

express()
  .use(express.static(path.join(__dirname, 'public')))
  // Encoders
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  // End of encoders
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/candidate/login', (req, res) => res.render('pages/candidate/login'))
  .get('/candidate/signup', (req, res) => res.render('pages/candidate/signup'))
  .post('/candidate/create_post', (req, res) => {
    console.log(req.body);
    const id = uuid.v4();
    candidates[id] = req.body;
    res.render('pages/candidate/welcome', {user: id, name: req.body.name || "IFORGOTMYNAME"});
  })
  .get('/candidate/gallery', (req, res) => res.render('pages/candidate/gallery'))
  .get('/recruiter/login', (req, res) => res.render('pages/recruiter/login'))
  .get('/recruiter/singup', (req, res) => res.render('pages/recruiter/signup'))
  .get('/recruiter/gallery', (req, res) => res.render('pages/recruiter/gallery'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
