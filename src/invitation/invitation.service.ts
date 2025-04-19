import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';;
import { addMonths } from 'date-fns';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvitation(dto: CreateInvitationDto, invitedById: string) {
    dto.email = dto.email.toLowerCase().trim();
    const { email, organizationId, role , expiresAt} = dto;
    const finalExpiresAt = expiresAt ?? addMonths(new Date(), 1);
    // Validar si ya existe una invitación activa (opcional, según lógica)
    const existing = await this.prisma.organizationInvitation.findFirst({
      where: {
        email,
        organizationId,
        status: 'PENDING',
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
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
        role, 
        expiresAt: finalExpiresAt,
      },
    });
  }

  async listByOrganization(organizationId: string) {
    const invitations = await this.prisma.organizationInvitation.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      include: {
        invitedBy: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  
    return invitations;
  }  
}
