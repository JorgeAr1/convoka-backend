import { Body, Controller, ForbiddenException, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Invitations')
@ApiBearerAuth()
@Controller('invitations')
@UseGuards(JwtAuthGuard)
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  async create(@Body() dto: CreateInvitationDto, @CurrentUser() user: User) {
    return this.invitationService.createInvitation(dto, user.id);
  }

  @Get('organization/:organizationId')
  @UseGuards(JwtAuthGuard)
  async listInvitationsByOrg(
    @Param('organizationId') organizationId: string,
    @CurrentUser() user: User
  ) {
    // Verificamos que el usuario sea parte de la organización y tenga permisos
    const membership = await this.prisma.userOrganization.findUnique({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId
        }
      }
    });

    if (!membership || (membership.role !== 'admin' && !user.isSuperAdmin)) {
      throw new ForbiddenException('No tienes acceso a esta organización');
    }

    return this.invitationService.listByOrganization(organizationId);
  }

  
}
