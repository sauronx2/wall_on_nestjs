import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidAuthorName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidAuthorName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null || value === undefined) {
            return false;
          }
          if (typeof value !== 'string') {
            return false;
          }
          if (value.length > 30) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value;
          if (value === null || value === undefined) {
            return 'authorName should not be null or undefined';
          }
          if (typeof value !== 'string') {
            return 'Author name must be a string';
          }
          if (value.length > 30) {
            return 'Author name is too long';
          }
        },
      },
    });
  };
}
