import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { mapDtoToPrismaData } from 'src/common/utils/prisma-mapper.util';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPersonDto: CreatePersonDto) {
    const data = mapDtoToPrismaData(createPersonDto, [
      'firstName',
      'lastName',
      'middleName',
      'email',
      'phone',
      'gender',
      'dateOfBirth',
      'birthplace',
      'nationality',
      'documentType',
      'documentNumber',
      'address',
      'city',
      'state',
      'country',
      'postalCode',
    ]);
  
    return this.prisma.person.create({
      data,
    });
  }  

  findAll() {
    return this.prisma.person.findMany();
  }

  findOne(id: string) {
    return this.prisma.person.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.person.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string) {
    return this.prisma.person.findUnique({
      where: { phone },
    });
  }  

  update(id: string, data: UpdatePersonDto) {
    return this.prisma.person.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.person.delete({
      where: { id },
    });
  }
}
