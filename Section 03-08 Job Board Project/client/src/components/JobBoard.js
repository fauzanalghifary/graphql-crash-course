import { useJobs } from "../graphql/hooks";
import JobList from "./JobList";

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
