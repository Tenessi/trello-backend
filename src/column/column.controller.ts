import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ColumnDto } from './dto/column.dto';
import { TaskService } from 'src/task/task.service';
import { updateColumnOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user/columns')
export class ColumnController {
  constructor(private readonly ColumnService: ColumnService, private readonly taskService: TaskService) {}

  @ApiTags('API')
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.ColumnService.getAll(userId)
  }

  @ApiTags('API')
  @Get(':id')
  @Auth()
  async getById(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.ColumnService.getById(userId, id)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: ColumnDto, @CurrentUser('id') userId: string) {
    return this.ColumnService.create(dto, userId)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('updateColumn/:id')
  @Auth()
  async update(@Body() dto: ColumnDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.ColumnService.update(dto, id, userId)
  }

  @ApiTags('API')
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.ColumnService.delete(id)
  }

  @ApiTags('API')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/updateOrder')
  @Auth()
  async updateOrder(@Body() updateColumnOrderDto: updateColumnOrderDto) {
    return this.ColumnService.updateOrder(updateColumnOrderDto.ids)
  }

}
