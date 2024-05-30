import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryBuilderModule } from './query-builder/query-builder.module';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { UsersService } from './users/users.service';
import { PostsService } from './posts/posts.service';
import { PrismaService } from './prisma/prisma.service';
import { SearchService } from './elastic/elastic.service';

@Module({
  imports: [QueryBuilderModule],
  controllers: [AppController, UsersController, PostsController],
  providers: [
    AppService,
    UsersService,
    PostsService,
    PrismaService,
    SearchService,
  ],
})
export class AppModule { }
