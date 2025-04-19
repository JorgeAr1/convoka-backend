import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { InvitationStatus } from '@prisma/client';

@Injectable()
export class InvitationCronService {
  private readonly logger = new Logger(InvitationCronService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleExpiredInvitations() {
    const now = new Date();

    const { count } = await this.prisma.organizationInvitation.updateMany({
      where: {
        expiresAt: { lt: now },
        status: InvitationStatus.PENDING,
      },
      data: {
        status: InvitationStatus.EXPIRED,
      },
    });

    if (count > 0) {
      this.logger.log(`✅ ${count} invitaciones expiradas correctamente.`);
    }
  }
}
