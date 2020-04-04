db.candidates.insertMany([
    {
        "_id": "special_candidate",
        "name": "Big candidate",
        "birthyear": 1990
    },
    {
        "_id": "special_candidate2",
        "name": "Small candidate",
        "birthyear": 1994
    }
])

db.companies.insertMany([
    {
        "_id": "special_company",
        "company": "Big company",
        "recruiter": "Big boss"
    },
    {
        "_id": "special_company2",
        "company": "Small company",
        "recruiter": "Small boss"
    },
])

db.jobs.insertMany([
    {
        "_id": "special_job",
        "title": "Best job",
        "companyId": "special_company"
    },
    {
        "_id": "special_job3",
        "title": "OK job",
        "companyId": "special_company"
    },
    {
        "_id": "special_job2",
        "title": "Bad job",
        "companyId": "special_company2"
    },
])
