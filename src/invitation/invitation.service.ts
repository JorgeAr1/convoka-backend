import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Role } from '@prisma/client';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvitation(dto: CreateInvitationDto, invitedById: string) {
    dto.email = dto.email.toLowerCase().trim();
    const { email, organizationId, role } = dto;
    
    // Validar si ya existe una invitación activa (opcional, según lógica)
    const existing = await this.prisma.organizationInvitation.findFirst({
      where: {
        email,
        organizationId,
        status: 'PENDING',
      },
    });

    if (existing) {
      throw new BadRequestException('Ya existe una invitación pendiente para este correo.');
    }

    return this.prisma.organizationInvitation.create({
      data: {
        email,
        organizationId,
        invitedById,
        role, // <-- Aquí usamos el role que viene del DTO
      },
    });
  }
}
