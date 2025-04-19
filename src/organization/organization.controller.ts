import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto, @CurrentUser() user: User) {
    return this.organizationService.createOrganization(dto, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.organizationService.updateOrganization(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.organizationService.deleteOrganization(id);
  }

  @Delete(':id/leave')
  leave(@Param('id') id: string, @CurrentUser() user: User) {
    return this.organizationService.leaveOrganization(user.id, id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalles de una organización' })
  findOne(@Param('id') id: string) {
    return this.organizationService.findOneById(id);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de organizaciones del usuario actual' })
  findUserOrganizations(@CurrentUser() user: User) {
    return this.organizationService.findOrganizationsByUser(user.id);
  }
}
