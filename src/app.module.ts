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
import { EventRequiredRelationshipModule } from './event-required-relationship/event-required-relationship.module';
import { RelationshipKindModule } from './relationship-kind/relationship-kind.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PersonRelationshipModule } from './person-relationship/person-relationship.module';
import { EventPaymentModule } from './event-payment/event-payment.module';
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
    EventRegistrationModule,
    EventRequiredRelationshipModule,
    RelationshipKindModule,
    PersonRelationshipModule,
    EventPaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
