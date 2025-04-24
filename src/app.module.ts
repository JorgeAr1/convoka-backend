import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { InvitationModule } from './invitation/invitation.module';
import { EventModule }  from './event/event.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    OrganizationModule,
    InvitationModule,
    EventModule,
    EventRegistrationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
