import { PrismaClient, Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';


const prisma = new PrismaClient();

async function main() {
    
    await prisma.user.deleteMany();
    
    const newOrg = await prisma.organization.create({
        data: {
            name: 'Iglesia Demo'
        },
    });

    // const newUsers = await prisma.user.createMany({
    //     data: [
    //         { 
    //             name: 'Jorge Arreygue',
    //             email: 'p1@correo.com',
    //             password: bcpass,
    //             isSuperAdmin: true,
    //             // organizationId: newOrg.id,
    //             role: 'super_admin'
    //          },
    //         { 
    //             name: 'Abraham Plata',
    //             email: 'p2@correo.com',
    //             password: bcpass,
    //             isSuperAdmin: false,
    //             // organizationId: newOrg.id,
    //             role: 'admin'
    //          },
    //     ],
    // });

    const adminPassword = bcryptjs.hashSync('admin123', 10);
    const userPassword = bcryptjs.hashSync('user123', 10);

    const admin = await prisma.user.create({
      data: { 
        name: 'Jorge Arreygue',
        email: 'p1@correo.com',
        password: adminPassword,
        isSuperAdmin: true,
        role: 'super_admin'
      },
    });

    const user = await prisma.user.create({
      data: { 
        name: 'Abraham Plata',
        email: 'p2@correo.com',
        password: userPassword,
        isSuperAdmin: false,
        role: 'admin'
      },
    });



    await prisma.userOrganization.createMany({
      data: [
        {
          userId: admin.id,
          organizationId: newOrg.id,
          role: 'super_admin',
        },
        {
          userId: user.id,
          organizationId: newOrg.id,
          role: 'admin',
        },
      ],
    });

    const relationshipKinds = [
      { name: 'Padre', description: 'Padre biológico o adoptivo' },
      { name: 'Madre', description: 'Madre biológica o adoptiva' },
      { name: 'Hijo', description: 'Hijo biológico o adoptivo' },
      { name: 'Hija', description: 'Hija biológica o adoptiva' },
      { name: 'Esposo', description: 'Cónyuge masculino' },
      { name: 'Esposa', description: 'Cónyuge femenino' },
      { name: 'Hermano', description: 'Hermano de sangre o adopción' },
      { name: 'Hermana', description: 'Hermana de sangre o adopción' },
      { name: 'Tutor', description: 'Responsable legal de un menor' },
      { name: 'Otro', description: 'Otro tipo de relación' }
    ]
    78
  
    for (const rel of relationshipKinds) {
      await prisma.relationshipKind.upsert({
        where: { name: rel.name },
        update: {},
        create: {
          name: rel.name,
          description: rel.description,
        },
      })
    }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
