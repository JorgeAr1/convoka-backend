import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let prisma: PrismaService;

  const mockPrisma = {
    organization: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
    userOrganization: {
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an organization', async () => {
    const dto = { name: 'Org Demo' };
    const userId = 'user-id-1';
    const created = { id: 'org-id', ...dto };

    mockPrisma.organization.create.mockResolvedValue(created);

    const result = await service.createOrganization(dto, userId);

    expect(result).toEqual(created);
    expect(prisma.organization.create).toHaveBeenCalledWith({
      data: { name: dto.name },
    });
  });

  it('should update an organization', async () => {
    const id = 'org-id';
    const dto = { name: 'Updated Name' };
    const updated = { id, ...dto };

    mockPrisma.organization.update.mockResolvedValue(updated);

    const result = await service.updateOrganization(id, dto);

    expect(result).toEqual(updated);
    expect(prisma.organization.update).toHaveBeenCalledWith({
      where: { id },
      data: dto,
    });
  });

  it('should delete an organization', async () => {
    const id = 'org-id';
    const deleted = { id, name: 'To Delete' };

    mockPrisma.organization.delete.mockResolvedValue(deleted);

    const result = await service.deleteOrganization(id);

    expect(result).toEqual(deleted);
    expect(prisma.organization.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should remove user from organization', async () => {
    const userId = 'user-id';
    const orgId = 'org-id';
    const deleted = { userId, organizationId: orgId };

    mockPrisma.userOrganization.delete.mockResolvedValue(deleted);

    const result = await service.leaveOrganization(userId, orgId);

    expect(result).toEqual(deleted);
    expect(prisma.userOrganization.delete).toHaveBeenCalledWith({
      where: {
        userId_organizationId: {
          userId,
          organizationId: orgId,
        },
      },
    });
  });

  it('should return an organization by id', async () => {
    const id = 'org-id';
    const org = { id, name: 'Test Org' };

    mockPrisma.organization.findUnique.mockResolvedValue(org);

    const result = await service.findOneById(id);

    expect(result).toEqual(org);
    expect(prisma.organization.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should return organizations for a user', async () => {
    const userId = 'user-id';
    const user = {
      organizations: [
        { organization: { id: 'org1', name: 'Org 1' } },
        { organization: { id: 'org2', name: 'Org 2' } },
      ],
    };

    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await service.findOrganizationsByUser(userId);

    expect(result).toEqual([
      { id: 'org1', name: 'Org 1' },
      { id: 'org2', name: 'Org 2' },
    ]);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
      include: {
        organizations: {
          include: { organization: true },
        },
      },
    });
  });

  it('should return empty array if user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const result = await service.findOrganizationsByUser('non-existent');
    expect(result).toEqual([]);
  });
});
