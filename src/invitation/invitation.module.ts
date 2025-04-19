import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { PrismaModule } from '../prisma/prisma.module';  
import { UserModule } from 'src/user/user.module'; 

@Module({
  imports: [UserModule, PrismaModule],  // Si necesitas el módulo de usuarios
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
