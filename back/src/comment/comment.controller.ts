import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService, private readonly commentsService: CommentsService) {}

  @Post('/create')
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: { text: string; authorName: string }) {
    return this.commentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
}
