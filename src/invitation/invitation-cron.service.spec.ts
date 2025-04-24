import { Test, TestingModule } from '@nestjs/testing';
import { InvitationCronService } from './invitation-cron.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationStatus } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('InvitationCronService', () => {
  let service: InvitationCronService;
  let prisma: PrismaService;

  const mockPrisma = {
    invitation: {
      updateMany: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvitationCronService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<InvitationCronService>(InvitationCronService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Debería actualizar las invitaciones vencidas al estado vencido.', async () => {
    const invitations = [
      { id: 'inv-1', status: InvitationStatus.PENDING, expirationDate: new Date('2025-01-01') },
      { id: 'inv-2', status: InvitationStatus.PENDING, expirationDate: new Date('2024-01-01') },
    ];

    // Simulamos que el cron debe marcar las invitaciones expiradas
    mockPrisma.invitation.findMany.mockResolvedValue(invitations);

    // Simulamos el comportamiento de updateMany
    mockPrisma.invitation.updateMany.mockResolvedValue({ count: 1 });

    // Ejecutamos el cron
    await service.handleExpiredInvitations();

    // Verificamos que se haya llamado updateMany para cambiar el estado de las invitaciones
    expect(mockPrisma.invitation.updateMany).toHaveBeenCalledWith({
      where: {
        expirationDate: { lt: new Date() },
        status: InvitationStatus.PENDING,
      },
      data: {
        status: InvitationStatus.EXPIRED,
      },
    });
  });

  it('No debería gestionar con elegancia las invitaciones vencidas.', async () => {
    mockPrisma.invitation.findMany.mockResolvedValue([]);

    // Ejecutamos el cron con ninguna invitación expirada
    await service.handleExpiredInvitations();

    // Verificamos que no se haya intentado actualizar ninguna invitación
    expect(mockPrisma.invitation.updateMany).not.toHaveBeenCalled();
  });

  it('Debería generar un error si algo sale mal con la actualización.', async () => {
    const error = new Error('Something went wrong');
    mockPrisma.invitation.updateMany.mockRejectedValue(error);

    try {
      await service.handleExpiredInvitations();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Algo salió mal');
    }
  });
});
