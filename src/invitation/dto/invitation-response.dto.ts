// invitation-response.dto.ts
import { Role, InvitationStatus } from '@prisma/client';

export class InvitationResponseDto {
  id: string;
  email: string;
  role: Role;
  status: InvitationStatus;
  invitedBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  expiresAt: Date;
}
