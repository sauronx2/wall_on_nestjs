import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty({ message: 'Text is required' })
  @IsString({ message: 'Text must be a string' })
  @MaxLength(500, { message: 'Text is too long' })
  text: string;

  @IsNotEmpty({ message: 'Author name is required' })
  @IsString({ message: 'Author name must be a string' })
  @MaxLength(30, { message: 'Author name is too long' })
  authorName: string;
}

export class UpdateCommentDTO {
  id?: string;

  @IsOptional()
  @IsString({ message: 'Text must be a string' })
  @MaxLength(500, { message: 'Text is too long' })
  text?: string;

  @IsOptional()
  @IsString({ message: 'Author name must be a string' })
  @MaxLength(30, { message: 'Author name is too long' })
  authorName?: string;
}
