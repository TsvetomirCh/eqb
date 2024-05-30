import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParam } from 'src/decorators/query-param.decorator';
import { QueryPostDto } from './dto/query-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('search')
  searchAll(@QueryParam() queryPostDto: QueryPostDto) {
    return this.postsService.search(queryPostDto);
  }

  @Get()
  findAll(@QueryParam() queryPostDto: QueryPostDto) {
    return this.postsService.find(queryPostDto);
  }

  @Get(':id')
  findOne(@QueryParam() queryPostDto: QueryPostDto) {
    return this.postsService.find(queryPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
