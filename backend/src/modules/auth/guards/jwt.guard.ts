import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

// Alias for backward compatibility
export class JwtAuthGuard extends JwtGuard {}
