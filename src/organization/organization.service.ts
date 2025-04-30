import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(dto: CreateOrganizationDto, userId: string) {
    const organization = await this.prisma.organization.create({
      data: {
        name: dto.name,
        Users: {
          create: {
            userId,
            role: 'admin', // o el enum correspondiente
          },
        },
      },
    });
    
    return organization;
  }

  async updateOrganization(id: string, dto: UpdateOrganizationDto) {
    return this.prisma.organization.update({
      where: { id },
      data: dto,
    });
  }

  async deleteOrganization(id: string) {
    return this.prisma.organization.delete({ where: { id } });
  }

  async leaveOrganization(userId: string, organizationId: string) {
    return this.prisma.userOrganization.delete({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }
  
  async findOrganizationsByUser(userId: string) {
    const userWithOrganizations = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        organizations: {
          include: { organization: true },
        },
      },
    });
  
    if (!userWithOrganizations) return [];
  
    return userWithOrganizations.organizations.map((o) => o.organization);
  }
  
}
