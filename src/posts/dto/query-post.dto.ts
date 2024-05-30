import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderByEnums } from 'src/enums/order-by.enums';

export class QueryPostDto {
  @IsOptional()
  @IsNumberString()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  published?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(OrderByEnums, {
    message: 'orderBy must be one of: "asc" or "desc ',
  })
  orderBy?: string = 'asc';

  @IsOptional()
  withAuthor: string;
}
