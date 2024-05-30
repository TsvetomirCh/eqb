import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryBuilderService } from '../query-builder/query-builder.service';
import { QueryPostDto } from './dto/query-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  private resource = 'post';

  constructor(
    private queryBuilderService: QueryBuilderService,
    private prisma: PrismaService,
  ) { }

  create(createPostDto: CreatePostDto) {
    return this.prisma.createPost(createPostDto);
  }

  search(queryPostDto: QueryPostDto) {
    return this.queryBuilderService.executeQuery(
      queryPostDto,
      this.resource,
      true,
    );
  }

  find(queryPostDto: QueryPostDto) {
    return this.queryBuilderService.executeQuery(queryPostDto, this.resource);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.updatePost(id, updatePostDto);
  }

  remove(id: number) {
    return this.prisma.deletePost(id);
  }
}
