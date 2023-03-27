import { useParams } from "react-router";
import { getCompany } from "../graphql/queries";
import { useEffect, useState } from "react";
import JobList from "./JobList";

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then((company) => setCompany(company));
  }, [companyId]);

  if (!company) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
      <br />
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </>
  );
}

export default CompanyDetail;
