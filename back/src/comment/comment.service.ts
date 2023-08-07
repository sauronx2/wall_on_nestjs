import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { text: string; authorName: string }) {
    return this.prisma.comment.create({
      data,
    });
  }

  async findOne(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: { text?: string; authorName?: string }) {
    const commentExists = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
    });

    if (!commentExists) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<{ message: string; id?: string }> {
    const commentExists = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
    });

    if (!commentExists) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Comment successfully deleted',
      id: id,
    };
  }
}
