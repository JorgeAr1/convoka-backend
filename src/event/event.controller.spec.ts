import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockEventService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new event', async () => {
    const dto: CreateEventDto = {
        name: 'Evento Test',
        startDate: new Date().toDateString(),
        organizationId: 'org123',
        locationId: 'loc123',
        endDate: new Date().toDateString()
    };

    const mockResponse = { id: '1', ...dto };
    mockEventService.create.mockResolvedValue(mockResponse);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all events', async () => {
    const mockEvents = [{ id: '1', title: 'Evento 1' }];
    mockEventService.findAll.mockResolvedValue(mockEvents);

    const result = await controller.findAll();
    expect(result).toEqual(mockEvents);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one event by id', async () => {
    const mockEvent = { id: '1', title: 'Evento 1' };
    mockEventService.findOne.mockResolvedValue(mockEvent);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockEvent);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update an event', async () => {
    const dto: UpdateEventDto = {
      name: 'Evento Actualizado',
    };

    const mockUpdated = { id: '1', ...dto };
    mockEventService.update.mockResolvedValue(mockUpdated);

    const result = await controller.update('1', dto);
    expect(result).toEqual(mockUpdated);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete an event', async () => {
    const mockDeleted = { id: '1', title: 'Evento Eliminado' };
    mockEventService.remove.mockResolvedValue(mockDeleted);

    const result = await controller.remove('1');
    expect(result).toEqual(mockDeleted);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
