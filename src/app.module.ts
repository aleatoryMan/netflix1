console.log(__dirname)
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { TurmaModule } from './turma/turma.module';
import { CursoModule } from './curso/curso.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public'
    }),
    AuthModule, 
    StudentModule,
    SchoolModule,     
    TurmaModule, 
    CursoModule,
    PrismaModule
  ],
})
export class AppModule {}
