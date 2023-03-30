import DataLoader from "dataloader";
import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});

db.on("query", ({ sql, bindings }) => {
  console.log(query);
});

export function createCompanyLoader() {
  return new DataLoader(async (companyIds) => {
    const comapnies = await db
      .select()
      .from("companies")
      .whereIn("id", companyIds);
    return companyIds.map((id) =>
      companies.find((company) => company.id === id)
    );
  });
}
