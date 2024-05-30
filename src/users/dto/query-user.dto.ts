import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderByEnums } from 'src/enums/order-by.enums';

export class QueryUserDto {
  @IsOptional()
  @IsNumberString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(OrderByEnums, {
    message: 'orderBy must be one of: "asc" or "desc ',
  })
  orderBy?: string = 'asc';

  @IsOptional()
  withPosts?: string;
}
