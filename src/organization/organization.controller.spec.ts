import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let service: OrganizationService;

  const mockService = {
    createOrganization: jest.fn(),
    updateOrganization: jest.fn(),
    deleteOrganization: jest.fn(),
    leaveOrganization: jest.fn(),
    findOneById: jest.fn(),
    findOrganizationsByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        {
          provide: OrganizationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should create an organization', async () => {
    const dto: CreateOrganizationDto = { name: 'Nueva Org' };
    const mockUser = { userId: 'user-123' };
    const created = { id: 'org-1', name: dto.name };

    mockService.createOrganization.mockResolvedValue(created);

    const result = await controller.create(dto, mockUser as any);
    expect(result).toEqual(created);
    expect(service.createOrganization).toHaveBeenCalledWith(dto, mockUser.userId);
  });

  it('should update an organization', async () => {
    const id = 'org-1';
    const dto: UpdateOrganizationDto = { name: 'Nombre actualizado' };
    const updated = { id, ...dto };

    mockService.updateOrganization.mockResolvedValue(updated);

    const result = await controller.update(id, dto);
    expect(result).toEqual(updated);
  });

  it('should delete an organization', async () => {
    const id = 'org-1';
    const deleted = { id, name: 'Eliminada' };

    mockService.deleteOrganization.mockResolvedValue(deleted);

    const result = await controller.delete(id);
    expect(result).toEqual(deleted);
  });

  it('should allow user to leave organization', async () => {
    const orgId = 'org-1';
    const mockUser = { userId: 'user-123' };
    const resultMock = { userId: mockUser.userId, organizationId: orgId };

    mockService.leaveOrganization.mockResolvedValue(resultMock);

    const result = await controller.leave(orgId, mockUser as any);
    expect(result).toEqual(resultMock);
  });

  it('should find organization by id', async () => {
    const id = 'org-1';
    const organization = { id, name: 'Org 1' };

    mockService.findOneById.mockResolvedValue(organization);

    const result = await controller.findOne(id);
    expect(result).toEqual(organization);
  });

  it('should find organizations by user', async () => {
    const mockUser = { userId: 'user-123' };
    const orgs = [
      { id: 'org-1', name: 'Org 1' },
      { id: 'org-2', name: 'Org 2' },
    ];

    mockService.findOrganizationsByUser.mockResolvedValue(orgs);

    const result = await controller.findOne(mockUser as any);
    expect(result).toEqual(orgs);
  });
});