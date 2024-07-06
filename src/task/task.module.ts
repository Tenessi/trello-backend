import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { ColumnService } from 'src/column/column.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, ColumnService],
  exports: [TaskService]
})
export class TaskModule {}
