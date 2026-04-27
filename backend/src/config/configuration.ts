export interface IMongoDbConfig {
  uri: string;
}

export const mongoDbConfig = (): IMongoDbConfig => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
});

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

export const zohoMailConfig = {
  smtpHost: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  smtpPort: parseInt(process.env.ZOHO_SMTP_PORT || '465'),
  email: process.env.ZOHO_EMAIL || 'ahsan@aiagenco.dev',
  password: process.env.ZOHO_PASSWORD || '',
};

