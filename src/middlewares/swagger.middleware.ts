import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

export const setupSwagger = (app: Express): void => {
  try {
    const swaggerFile = path.join(__dirname, '../../swagger.json');
    const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
    const swaggerDocument = JSON.parse(swaggerData);
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Medical Laboratory API Documentation'
    }));
    
    console.log('Swagger documentation available at /api-docs');
  } catch (error) {
    console.error('Failed to set up Swagger documentation:', error);
  }
};
