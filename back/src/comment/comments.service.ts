import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    sortField: 'authorName' | 'updatedAt' = 'updatedAt',
    sortOrder: 'asc' | 'desc' = 'asc',
    date?: string,
    authorName?: string,
  ): Promise<any[]> {
    const where = {};
    const orderBy = {};

    if (date) {
      const startDate = this.parseQueryDate(date);
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 1); // добавляем одну минуту, чтобы покрыть весь диапазон

      const results = await this.prisma.comment.findMany({
        where: {
          updatedAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      if (results.length === 0) {
        throw new NotFoundException('Comments not found for the provided date.');
      }

      return results;
    }

    if (authorName) {
      where['authorName'] = { contains: authorName };
    }

    orderBy[sortField] = sortOrder;

    return this.prisma.comment.findMany({
      where,
      orderBy,
    });
  }

  private parseQueryDate = (date: string): Date => {
    const [datePart, timePart] = date.split('/');
    return new Date(`${datePart}T${timePart}:00.000Z`);
  };
}
