"use strict";

import express from 'express';
import path from 'path';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import * as service from './service.mjs';
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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
  .post('/candidate/create_post', async (req, res) => {
    const id = uuid.v4();
    const candidateData = {_id: id, ...req.body};
    await service.addCandidate(candidateData);
    res.redirect(`/candidate/welcome?id=${id}`);
  })
  .get('/candidate/welcome', async (req, res) => {
    const candidateData = await service.getCandidate(req.query.id);
    res.render('pages/candidate/welcome', {id: candidateData._id, name: candidateData.name});
  })
  .get('/candidate/gallery', (req, res) => res.render('pages/candidate/gallery'))
  .get('/recruiter/login', (req, res) => res.render('pages/recruiter/login'))
  .get('/recruiter/signup', (req, res) => res.render('pages/recruiter/signup'))
  .post('/recruiter/create_account', async (req, res) => {
    const id = uuid.v4();
    const companyData = {_id: id, ...req.body};
    await service.addCompany(companyData);
    res.redirect(`/recruiter/welcome?id=${id}`);
  })
  .get('/recruiter/welcome', async (req, res) => {
    const companyData = await service.getCompany(req.query.id);
    res.render('pages/recruiter/welcome', {id: companyData._id, name: companyData.recruiter});
  })
  .get('/recruiter/gallery', async (req, res) => {
    // Return all candidates to the recruiter
    const candidateDocs = await service.getCandidates();
    const candidates = [];
    for (const candidateDoc of candidateDocs) {
      const candidate = candidateDoc.toObject();
      candidate.age = (new Date).getFullYear() - candidate.birthyear;
      candidates.push(candidate);
    }
    res.json({candidates});
  })
  .get('/job/gallery', async (req, res) => {
    // Return all candidates to the recruiter
    const jobDocs = await service.getJobs();
    const jobs = []
    for (const jobDoc of jobDocs) {
      const companyData = await service.getCompany(jobDoc.companyId);
      const job = jobDoc.toObject();
      job.company = companyData.company;
      jobs.push(job);
    }
    res.json({jobs});
  })
  .get('/recruiter/create_job', async (req, res) => {
    const companyData = await service.getCompany(req.query.id);
    res.render('pages/recruiter/create_job', {id: companyData._id, name: companyData.recruiter});
  })
  .post('/job/create', async (req, res) => {
    const id = uuid.v4();
    const jobData = {_id: id, ...req.body};
    await service.addJob(jobData);
    res.redirect(`/recruiter/welcome?id=${req.body.companyId}`);
  })
  .use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
