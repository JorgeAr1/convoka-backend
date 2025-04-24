import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationController } from './event-registration.controller';
import { EventRegistrationService } from './event-registration.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';

describe('EventRegistrationController', () => {
  let controller: EventRegistrationController;
  let service: EventRegistrationService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRegistrationController],
      providers: [
        {
          provide: EventRegistrationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EventRegistrationController>(EventRegistrationController);
    service = module.get<EventRegistrationService>(EventRegistrationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new registration', async () => {
    const dto: CreateEventRegistrationDto = {
      personId: 'person1',
      eventId: 'event1',
      roleId: 'role1',
      hasPaid: true,
      amountPaid: 100,
      totalCost: 150,
    };

    const mockResponse = { id: 'reg1', ...dto };
    mockService.create.mockResolvedValue(mockResponse);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all registrations', async () => {
    const mockList = [{ id: 'reg1' }];
    mockService.findAll.mockResolvedValue(mockList);

    const result = await controller.findAll();
    expect(result).toEqual(mockList);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a registration by id', async () => {
    const mockRegistration = { id: 'reg1' };
    mockService.findOne.mockResolvedValue(mockRegistration);

    const result = await controller.findOne('reg1');
    expect(result).toEqual(mockRegistration);
    expect(service.findOne).toHaveBeenCalledWith('reg1');
  });

  it('should update a registration', async () => {
    const dto: UpdateEventRegistrationDto = {
      hasPaid: true,
      amountPaid: 200,
    };

    const mockUpdated = { id: 'reg1', ...dto };
    mockService.update.mockResolvedValue(mockUpdated);

    const result = await controller.update('reg1', dto);
    expect(result).toEqual(mockUpdated);
    expect(service.update).toHaveBeenCalledWith('reg1', dto);
  });

  it('should delete a registration', async () => {
    const mockDeleted = { id: 'reg1' };
    mockService.remove.mockResolvedValue(mockDeleted);

    const result = await controller.remove('reg1');
    expect(result).toEqual(mockDeleted);
    expect(service.remove).toHaveBeenCalledWith('reg1');
  });
});
