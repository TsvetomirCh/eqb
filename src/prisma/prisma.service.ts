import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SearchService } from 'src/elastic/elastic.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.user.create({
      data: createUserDto,
    });

    await this.searchService.indexResource('user', user);
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    await this.searchService.indexResource('user', user);
    return user;
  }

  async deleteUser(id: number) {
    await this.user.delete({
      where: { id },
    });
    await this.searchService.removeResource('user', id);
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.post.create({
      data: createPostDto,
    });

    await this.searchService.indexResource('post', post);
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.post.update({
      where: { id: id },
      data: updatePostDto,
    });

    await this.searchService.indexResource('post', post);
    return post;
  }

  async deletePost(id: number) {
    await this.post.delete({
      where: { id },
    });
    await this.searchService.removeResource('post', id);
  }
}
