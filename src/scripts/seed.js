import { PrismaClient } from "@prisma/client";
import roles from "../database/data/roles.json" assert { type: "json" };
import permissions from "../database/data/permissions.json" assert { type: "json" };

async function seedRoles(prisma) {
  await prisma.role.deleteMany();

  const seededRoles = await Promise.all(
    roles.map(async (role) => {
      await prisma.role.create({
        data: {
          name: role.name,
          description: role.description,
        },
      });
    })
  );

  console.log(`Seeded ${seededRoles.length} roles.`);
}

async function seedPermissions(prisma) {
  await prisma.permission.deleteMany();

  const seededPermissions = await Promise.all(
    permissions.map(async (permission) => {
      await prisma.permission.create({
        data: {
          name: permission.name,
          description: permission.description,
        },
      });
    })
  );

  console.info(`Seeded ${seededPermissions.length} permissions.`);
}

async function seedPermissionsOnRoles(prisma) {
  console.info("Seeding PermissionsOnRoles...");

  const permissionsOnRoles = await Promise.all(
    roles.map(async (role) => {
      const foundRole = await prisma.role.findFirst({
        where: { name: role.name },
      });

      await Promise.all(
        role.permissions.map(async (permission) => {
          console.info(`Processing ${role.name}-${permission}`);
          const foundPermission = await prisma.permission.findFirst({
            where: { name: permission },
          });
          await prisma.permissionsOnRoles.create({
            data: { roleId: foundRole.id, permissionId: foundPermission.id },
          });
        })
      );
    })
  );

  console.info(`Seeded ${permissionsOnRoles.length} roles-permissions.`);
}

async function main() {
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });

  prisma.$connect();

  console.info(`🌱 Seeding database...`);

  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedPermissionsOnRoles(prisma);

  await prisma.$disconnect();

  console.info(`🌱 Seeding finished.`);
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
