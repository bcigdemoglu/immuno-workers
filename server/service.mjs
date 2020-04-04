"use strict";

import mongoose from 'mongoose';
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const CandidateSchema = new mongoose.Schema({
    _id: String,
    name: String,
    birthyear: Number
})
const Candidate = mongoose.model('candidate', CandidateSchema, "candidates")

const CompanySchema = new mongoose.Schema({
    _id: String,
    company: String,
    recruiter: String
})
const Company = mongoose.model('company', CompanySchema, "companies")

const JobSchema = new mongoose.Schema({
    _id: String,
    title: String,
    companyId: String
})
const Job = mongoose.model('job', JobSchema, "jobs")

export const getCandidates = async () => await Candidate.find();
export const getCompanies = async () => await Company.find();
export const getJobs = async () => await Job.find();
export const addCandidate = async data => await new Candidate(data).save();
export const addCompany = async data => await new Company(data).save();
export const addJob = async data => await new Job(data).save();
export const getCandidate = async candidateId => await Candidate.findById(candidateId);
export const getCompany = async companyId => await Company.findById(companyId);
export const removeCandidate = async candidateId => await Candidate.findByIdAndRemove(candidateId);
