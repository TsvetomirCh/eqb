import { Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { PrismaService } from '../prisma/prisma.service';
import { SearchService } from 'src/elastic/elastic.service';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  // imports: [ElasticsearchModule.register({
  //   node: 'http://localhost:9200',
  // })],
  providers: [QueryBuilderService, PrismaService, SearchService],
  exports: [QueryBuilderService],
})
export class QueryBuilderModule { }
