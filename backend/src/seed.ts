import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);

  try {
    const existingUser = await usersService.findByUsername('superadmin');
    if (!existingUser) {
      await usersService.createUser('superadmin', 'admin123456');
      console.log('Superadmin created: username=superadmin, password=admin123456');
    } else {
      console.log('Superadmin already exists');
    }
  } catch (error) {
    console.error('Error creating superadmin:', error);
  }

  await app.close();
}

bootstrap();