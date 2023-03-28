import { Company, Job } from "./db.js";

function rejectIf(condition, message) {
  if (condition) {
    throw new Error(message);
  }
}

export const resolvers = {
  Query: {
    company: (_root, args) => Company.findById(args.id),
    job: (_root, args) => Job.findById(args.id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      const job = Job.create({ ...input, companyId: user.companyId });
      return job;
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user, "Unauthorized");

      const job = await Job.findById(id);
      rejectIf(job.companyId !== user.companyId, "Job not found");
      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user, "Unauthorized");
      const job = await Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId, "Job not found");
      return Job.update({ ...input, companyId: user.companyId });
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
