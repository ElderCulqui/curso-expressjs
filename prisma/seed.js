const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // const demoUsers = [
  //   { name: 'Juan Perez', email: 'juan.perez@example.com', password: 'secret123', role: 'USER' },
  //   { name: 'María López', email: 'maria.lopez@example.com', password: 'secret123', role: 'USER' },
  //   { name: 'Carlos García', email: 'carlos.garcia@example.com', password: 'secret123', role: 'USER' }
  // ];

  // for (const user of demoUsers) {
  //   await prisma.user.create({
  //     data: user
  //   });
  // }

  // console.log('Usuarios de demostración creados con éxito');

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