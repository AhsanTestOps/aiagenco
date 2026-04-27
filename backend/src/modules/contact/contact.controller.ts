import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from '@dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendContact(@Body() contactDto: ContactDto) {
    console.log('Contact endpoint called with data:', contactDto);

    try {
      if (!contactDto.fullName || !contactDto.email || !contactDto.subject || !contactDto.projectDetails) {
        throw new BadRequestException('Full name, email, subject, and project details are required');
      }

      await this.contactService.sendContactEmail(contactDto);
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Contact endpoint error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send message. Please try again later.',
        error: error.message,
        timestamp: new Date(),
      };
    }
  }
}
