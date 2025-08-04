const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // const demoUsers = [
  //   { name: 'Juan PÃ©rez', email: 'juan.perez@example.com' },
  //   { name: 'MarÃ­a LÃ³pez', email: 'maria.lopez@example.com' },
  //   { name: 'Carlos GarcÃ­a', email: 'carlos.garcia@example.com' }
  // ];

  // for (const user of demoUsers) {
  //   await prisma.user.create({
  //     data: user
  //   });
  // }

  // console.log('Usuarios de demostraciÃ³n creados con Ã©xito');

  await prisma.user.deleteMany();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });