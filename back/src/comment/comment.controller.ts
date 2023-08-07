import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsService } from './comments.service';
import { CreateCommentDTO, UpdateCommentDTO } from './create-comment.dto';
import { plainToClass } from 'class-transformer';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService, private readonly commentsService: CommentsService) {}

  @Post('/create')
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(
    @Query('sortField') sortField?: 'authorName' | 'updatedAt',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('date') date?: string,
    @Query('authorName') authorNameFilter?: string,
  ): Promise<any[]> {
    return this.commentsService.findAll(sortField, sortOrder, date, authorNameFilter);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: UpdateCommentDTO) {
    const updateCommentDto = plainToClass(UpdateCommentDTO, data);
    if (updateCommentDto.id) {
      throw new BadRequestException('Updating the id is not allowed');
    }
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.remove(id);
  }
}
