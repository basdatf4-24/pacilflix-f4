import sql from "~/lib/server/db.server";

export async function getContributor() {
  let res = await sql`SELECT c.*, 
    CASE 
        WHEN p.id IS NOT NULL THEN 'PEMAIN' 
        WHEN ps.id IS NOT NULL THEN 'PENULIS_SKENARIO' 
        WHEN s.id IS NOT NULL THEN 'SUATRADARA' 
    END AS type
    FROM contributors c LEFT JOIN PEMAIN P ON p.id = c.id LEFT JOIN 
    PENULIS_SKENARIO ps ON ps.id = c.id LEFT JOIN SUTRADARA s ON s.id = c.id`;
  return res;
}

export async function getContributorByTpe(type: string) {
  let res = await sql`SELECT * FROM (
    SELECT c.*, 
      CASE 
        WHEN p.id IS NOT NULL THEN 'PEMAIN' 
        WHEN ps.id IS NOT NULL THEN 'PENULIS_SKENARIO' 
        WHEN s.id IS NOT NULL THEN 'SUTRADARA' 
      END AS type
    FROM contributors c
    LEFT JOIN PEMAIN p ON p.id = c.id
    LEFT JOIN PENULIS_SKENARIO ps ON ps.id = c.id
    LEFT JOIN SUTRADARA s ON s.id = c.id
  ) AS subquery
  WHERE type = ${type};
`;
  return res;
}
