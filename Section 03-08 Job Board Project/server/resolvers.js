import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    company: (_root, args) => Company.findById(args.id),
    job: (_root, args) => Job.findById(args.id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }) => {
      const job = Job.create(input);
      return job;
    },
    deleteJob: (_root, { id }) => {
      const job = Job.delete(id);
      return job;
    },
    updateJob: (_root, { input }) => {
      const job = Job.update(input);
      return job;
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
