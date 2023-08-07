import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommentService } from './comment.service';
import { CommentsService } from './comments.service';
import { CommentController } from './comment.controller';

@Module({
  providers: [CommentService, CommentsService, PrismaService],
  controllers: [CommentController],
})
export class CommentModule {}
