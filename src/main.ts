import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('API Formularios Dinamicos')
  .setDescription('API para el manejo de la informacion de formularios de una base de datos')
  .addTag('Database')
  .addTag('Connection')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, documentFactory, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  app.enableCors({
    origin: '*', // Permite todas las solicitudes (puedes restringirlo)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  
  await app.listen(process.env.PORT ?? 3000);

  

}
bootstrap();
