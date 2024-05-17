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

export async function getContributorByShowId(id: string) {
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
    WHERE c.;
  `;
  return res;
}

export async function getContributorsByShowId(showId: string) {
  const res = await sql`
      SELECT c.*, 'PEMAIN' AS role
      FROM contributors c
      JOIN PEMAIN p ON p.id = c.id
      JOIN MEMAINKAN_TAYANGAN mt ON mt.ID_PEMAIN = p.id
      WHERE mt.ID_TAYANGAN = ${showId}
      
      UNION ALL
      
      SELECT c.*, 'PENULIS_SKENARIO' AS role
      FROM contributors c
      JOIN PENULIS_SKENARIO ps ON ps.id = c.id
      JOIN MENULIS_SKENARIO_TAYANGAN mst ON mst.ID_PENULIS_SKENARIO = ps.id
      WHERE mst.ID_TAYANGAN = ${showId};
    `;
  return res;
}
