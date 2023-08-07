import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [CommentsModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
