import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';
import { ColumnService } from 'src/column/column.service';
import { updateTaskOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly columnService: ColumnService) {}

  @ApiTags('API')
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.taskService.getAll(userId)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
    return this.taskService.create(dto, userId)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('updateTask/:id')
  @Auth()
  async update(@Body() dto: TaskDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.taskService.update(dto, id, userId)
  }

  @ApiTags('API')
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('updateOrder')
  @Auth()
  async updateOrder(@Body() updateTaskOrderDto: updateTaskOrderDto) {
    return this.taskService.updateOrder(updateTaskOrderDto.ids)
  }

}
