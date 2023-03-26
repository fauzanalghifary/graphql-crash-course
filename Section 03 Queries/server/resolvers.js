import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    company: (_root, args) => Company.findById(args.id),
    job: (_root, args) => Job.findById(args.id),
    jobs: () => Job.findAll(),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
