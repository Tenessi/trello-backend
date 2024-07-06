import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskModule } from 'src/task/task.module';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [TaskModule],
  controllers: [ColumnController],
  providers: [ColumnService, PrismaService, TaskService],
  exports: [ColumnService]
})
export class ColumnModule {}
