import "dotenv/config";

import { Gender, Major, PrismaClient } from "@/lib/generated/prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  const students = [];

  // Xóa dữ liệu cũ
  await prisma.student.deleteMany({});
  console.log("🗑️  Old data cleared");

  // 5 nam
  for (let i = 0; i < 5; i++) {
    const firstName = faker.person.firstName("male");
    const lastName = faker.person.lastName();

    students.push({
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      gender: Gender.MALE,
      major: faker.helpers.arrayElement(Object.values(Major)),
      gpa: Number(
        faker.number.float({ min: 2.0, max: 4.0, fractionDigits: 2 })
      ),
      dob: faker.date.birthdate({ min: 18, max: 25, mode: "age" }),
      phone: faker.helpers.replaceSymbols("+84#########"),
      address: faker.location.city(),
    });
  }

  // 5 nữ
  for (let i = 0; i < 5; i++) {
    const firstName = faker.person.firstName("female");
    const lastName = faker.person.lastName("female");

    students.push({
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      gender: Gender.FEMALE,
      major: faker.helpers.arrayElement(Object.values(Major)),
      gpa: Number(
        faker.number.float({ min: 2.0, max: 4.0, fractionDigits: 2 })
      ),
      dob: faker.date.birthdate({ min: 18, max: 25, mode: "age" }),
      phone: faker.helpers.replaceSymbols("+84#########"),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.country()}`,
    });
  }

  await prisma.student.createMany({ data: students });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
