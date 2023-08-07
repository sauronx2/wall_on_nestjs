import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { text: string; authorName: string }) {
    return this.prisma.comment.create({
      data,
    });
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: { text?: string; authorName?: string }) {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
