import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;
}
