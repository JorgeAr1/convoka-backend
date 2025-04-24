import { Test, TestingModule } from '@nestjs/testing';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';

describe('InvitationController', () => {
  let controller: InvitationController;
  let service: InvitationService;
  let prisma: PrismaService;

  const mockService = {
    createInvitation: jest.fn(),
    listByOrganization: jest.fn(),
  };

  const mockPrisma = {
    userOrganization: {
      findUnique: jest.fn(),
    },
  };

  const mockCurrentUser: User = {
      id: 'user-123',
      isSuperAdmin: false,
      name: 'User Test',
      email: '123@example.com',
      password: '123456',
      role: 'user'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationController],
      providers: [
        {
          provide: InvitationService,
          useValue: mockService,
        },
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    controller = module.get<InvitationController>(InvitationController);
    service = module.get<InvitationService>(InvitationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create an invitation', async () => {
    const dto: CreateInvitationDto = { email: 'user@example.com', organizationId: 'org-1', role: 'user' };
    const createdInvitation = { id: 'inv-1', ...dto, status: InvitationStatus.PENDING };

    mockService.createInvitation.mockResolvedValue(createdInvitation);

    const result = await controller.create(dto, mockCurrentUser);
    expect(result).toEqual(createdInvitation);
    expect(service.createInvitation).toHaveBeenCalledWith(dto, mockCurrentUser.id);
  });

  it('should list invitations by organization if user has access', async () => {
    const organizationId = 'org-1';
    const invitations = [
      { id: 'inv-1', email: 'user1@example.com', status: InvitationStatus.PENDING },
      { id: 'inv-2', email: 'user2@example.com', status: InvitationStatus.ACCEPTED },
    ];

    mockPrisma.userOrganization.findUnique.mockResolvedValue({ role: 'admin' });
    mockService.listByOrganization.mockResolvedValue(invitations);

    const result = await controller.listInvitationsByOrg(organizationId, mockCurrentUser);
    expect(result).toEqual(invitations);
    expect(service.listByOrganization).toHaveBeenCalledWith(organizationId);
  });

  it('should throw a ForbiddenException if user does not have access to the organization', async () => {
    const organizationId = 'org-1';

    mockPrisma.userOrganization.findUnique.mockResolvedValue(null); // User is not a member

    try {
      await controller.listInvitationsByOrg(organizationId, mockCurrentUser);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
      expect(e.message).toBe('No tienes acceso a esta organización');
    }
  });
});
