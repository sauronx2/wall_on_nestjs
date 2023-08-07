import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { text: string; authorName: string }) {
    return this.commentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
