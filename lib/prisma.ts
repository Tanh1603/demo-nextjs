// import { withAccelerate } from "@prisma/extension-accelerate";
// import { PrismaClient } from "./generated/prisma/client";

// const prisma = new PrismaClient().$extends(withAccelerate());

// const globalForPrisma = global as unknown as { prisma: typeof prisma };

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

attachDatabasePool(pool);

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

export default prisma;
