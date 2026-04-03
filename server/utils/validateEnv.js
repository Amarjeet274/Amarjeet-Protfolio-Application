const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS',
  'RECIPIENT_EMAIL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const validateEnvironment = () => {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease add these to your .env file');
    process.exit(1);
  }
  
  console.log('All required environment variables are set');
};

module.exports = validateEnvironment;
