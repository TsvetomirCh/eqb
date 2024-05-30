import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { QueryBuilderService } from '../query-builder/query-builder.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private resource = 'user';

  constructor(
    private queryBuilderService: QueryBuilderService,
    private prisma: PrismaService,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.createUser(createUserDto);
  }

  find(queryUserDto: QueryUserDto) {
    return this.queryBuilderService.executeQuery(queryUserDto, this.resource);
  }

  search(queryUserDto: QueryUserDto) {
    return this.queryBuilderService.executeQuery(
      queryUserDto,
      this.resource,
      true,
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.prisma.deleteUser(id);
  }
}
