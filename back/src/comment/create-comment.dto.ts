import { IsDefined, IsOptional, MaxLength } from 'class-validator';
import { IsValidAuthorName } from 'src/validators/isValidAuthorName.validator';

export class CreateCommentDTO {
  @IsDefined({ message: 'Text should not be null or undefined' })
  @MaxLength(500, { message: 'Text is too long' })
  text: string;

  @IsValidAuthorName({ message: 'Author name is required, must be a string, and not too long' })
  authorName: string;
}

export class UpdateCommentDTO {
  id?: string;

  @IsDefined({ groups: ['put'], message: 'Text should not be null or undefined' })
  @MaxLength(500, { message: 'Text is too long', groups: ['put'] })
  text?: string;

  @IsDefined({ groups: ['put'], message: 'Author name should not be null or undefined' })
  @IsValidAuthorName({ message: 'Author name is required, must be a string, and not too long', groups: ['put'] })
  authorName?: string;
}

export class PatchCommentDTO {
  @IsOptional()
  @MaxLength(500, { message: 'Text is too long' })
  text?: string;

  @IsOptional()
  @IsValidAuthorName({ message: 'Author name is required, must be a string, and not too long' })
  authorName?: string;
}
