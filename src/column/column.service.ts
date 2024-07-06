import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.column.findMany({
      where: {
        userId
      },
      include: {
        tasks: true
      },
      orderBy: {
        order: "desc"
      }
    })
  }

  async getById(userId: string, id: string) {
    return this.prisma.column.findUnique({
      where: {
        id: id,
        userId: userId
      }
    })
  }

  async create(dto: ColumnDto, userId: string) {
    return this.prisma.column.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async update(dto: Partial<ColumnDto>, columnId: string, userId: string) {
    return this.prisma.column.update({
      where: {
        userId,
        id: columnId
      },
      data: dto
    })
  }

  async delete(userId: string) {
    return this.prisma.column.delete({
      where: {
        id: userId
      }
    })
  }

  async updateOrder(ids: string[]) {
    return this.prisma.$transaction(
      ids.map((id, order) => 
        this.prisma.column.update({
          where: { id },
          data: { order }
        })
      )
    )
  }
}
