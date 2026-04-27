import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from '@dto/contact.dto';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const email = this.configService.get('ZOHO_EMAIL');
    const password = this.configService.get('ZOHO_PASSWORD');
    const host = this.configService.get('ZOHO_SMTP_HOST') || 'smtp.zoho.com';
    const port = parseInt(this.configService.get('ZOHO_SMTP_PORT') || '465');

    console.log('Initializing Zoho transporter:', {
      host,
      port,
      email,
      passwordSet: !!password,
    });

    if (!email || !password) {
      console.error('Missing Zoho credentials! Email:', email, 'Password:', password ? 'SET' : 'NOT SET');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });
  }

  async sendContactEmail(contactData: ContactDto): Promise<boolean> {
    try {
      console.log('Sending contact email for:', contactData.fullName);

      if (!contactData.fullName || !contactData.email || !contactData.subject || !contactData.projectDetails) {
        throw new BadRequestException('Missing required fields');
      }

      const recipientEmail = this.configService.get('ZOHO_EMAIL');

      if (!recipientEmail) {
        throw new InternalServerErrorException('Recipient email not configured');
      }

      // Test the connection before sending
      try {
        await this.transporter.verify();
        console.log('Zoho SMTP connection verified');
      } catch (verifyError) {
        console.error('SMTP verification error:', verifyError);
        throw new InternalServerErrorException(`SMTP connection failed: ${verifyError.message}`);
      }

      const mailOptions = {
        from: this.configService.get('ZOHO_EMAIL'),
        to: recipientEmail,
        subject: `New Contact Form Submission: ${contactData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
            <h2 style="color: #333; border-bottom: 3px solid #7c3aed; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p><strong style="color: #7c3aed;">Full Name:</strong> ${contactData.fullName}</p>
              <p><strong style="color: #7c3aed;">Email:</strong> ${contactData.email}</p>
              ${contactData.phone ? `<p><strong style="color: #7c3aed;">Phone:</strong> ${contactData.phone}</p>` : ''}
              <p><strong style="color: #7c3aed;">Subject:</strong> ${contactData.subject}</p>
              ${contactData.companyName ? `<p><strong style="color: #7c3aed;">Company Name:</strong> ${contactData.companyName}</p>` : ''}
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <p><strong style="color: #7c3aed;">Project Details:</strong></p>
                <p style="white-space: pre-wrap; color: #666;">${contactData.projectDetails}</p>
              </div>
            </div>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
              <p>This is an automated email from your website contact form.</p>
            </div>
          </div>
        `,
        replyTo: contactData.email,
      };

      console.log('Attempting to send email to:', recipientEmail);
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error.message || error);
      throw new InternalServerErrorException(`Failed to send email: ${error.message}`);
    }
  }
}
