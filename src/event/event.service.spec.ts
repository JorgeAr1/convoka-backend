import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  const mockPrisma = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event with existing locationId', async () => {
    const dto: CreateEventDto = {
      name: 'Evento de prueba',
      description: 'Descripción del evento de prueba',
      organizationId: 'org123',
      locationId: 'loc456',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    const expectedPrismaCall = {
      data: {
        name: dto.name,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        organization: {
          connect: { id: dto.organizationId },
        },
        location: {
          connect: { id: dto.locationId },
        },
      },
    };

    mockPrisma.event.create.mockResolvedValue({ id: '1', ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(mockPrisma.event.create).toHaveBeenCalledWith(expectedPrismaCall);
  });

  it('should create an event with a new location (locationDescription)', async () => {
    const dto: CreateEventDto = {
      name: 'Evento con nueva ubicación',
      description: 'Descripción del evento',
      organizationId: 'org789',
      locationDescription: 'Sala A - Segundo piso',
      locationAddress: 'Av. Principal 123',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    const expectedPrismaCall = {
      data: {
        name: dto.name,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        organization: {
          connect: { id: dto.organizationId },
        },
        location: {
          create: {
            name: dto.locationDescription,
            address: dto.locationAddress,
            organization: {
              connect: { id: dto.organizationId },
            },
          },
        },
      },
    };

    mockPrisma.event.create.mockResolvedValue({ id: '2', ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: '2', ...dto });
    expect(mockPrisma.event.create).toHaveBeenCalledWith(expectedPrismaCall);
  });

  it('should return all events', async () => {
    const mockEvents = [{ id: '1', title: 'Evento 1' }];
    mockPrisma.event.findMany.mockResolvedValue(mockEvents);

    const result = await service.findAll();
    expect(result).toEqual(mockEvents);
    expect(mockPrisma.event.findMany).toHaveBeenCalled();
  });

  it('should throw if event not found', async () => {
    mockPrisma.event.findUnique.mockResolvedValue(null);

    await expect(service.findOne('nonexistent')).rejects.toThrow(
      'Evento no encontrado',
    );
  });
});
