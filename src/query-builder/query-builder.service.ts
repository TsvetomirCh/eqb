import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QueryBuilderService {
  constructor(private readonly prisma: PrismaService) { }

  private async executeElasticQuery(queryDto: any, resource: string) {
    const result = this.buildElasticQuery(queryDto, resource);

    console.log('ES Query:', JSON.stringify(result, null, 2));
    return [];
  }

  private buildElasticQuery(queryDto: any, resource: string) {
    const { sortBy, orderBy, ...remainingProps } = queryDto;

    const { withKeys, remainingWhereProps } =
      this.extractAndRemoveWithKeys(remainingProps);

    const include = this.handleIncluseClauses(withKeys);
    console.log('Handle inclusions', include);

    const query: Record<string, any> = {
      bool: {
        must: [],
        filter: [],
      },
    };

    for (const [key, value] of Object.entries(remainingWhereProps)) {
      if (typeof value == 'boolean') {
        query.bool.filter.push({
          term: {
            [key]: value,
          },
        });
        continue;
      }

      if (value !== undefined) {
        query.bool.must.push({
          match: {
            [key]: value,
          },
        });
      }
    }

    if (sortBy) {
      query['sort'] = [
        {
          [sortBy]: {
            order: orderBy,
          },
        },
      ];
    }

    return {
      index: resource,
      body: {
        query: query,
      },
    };
  }

  private buildPrismaQuery(queryDto: any) {
    const { sortBy, orderBy, ...remainingProps } = queryDto;

    const query: Record<string, any> = {};

    const { withKeys, remainingWhereProps } =
      this.extractAndRemoveWithKeys(remainingProps);

    query['where'] = this.handleWhereClauses(remainingWhereProps);
    query['include'] = this.handleIncluseClauses(withKeys);

    if (sortBy) {
      query.orderBy = { [sortBy]: orderBy };
    }

    return query;
  }

  private async executePrismaQuery(queryDto: any, resource: string) {
    if (this.shouldQueryById(queryDto)) {
      return this.prisma[resource].findUnique({ where: { id: +queryDto.id } });
    }

    const query = this.buildPrismaQuery(queryDto);
    console.log('Query:', query);
    return this.prisma[resource].findMany(query);
  }

  async executeQuery(queryDto: any, resource: string, search: boolean = false) {
    if (search) {
      return this.executeElasticQuery(queryDto, resource);
    }

    return this.executePrismaQuery(queryDto, resource);
  }

  private shouldQueryById(queryDto): boolean {
    return !!queryDto.id;
  }

  private extractAndRemoveWithKeys(queryDto) {
    const withKeys = {};
    const remainingWhereProps = { ...queryDto };

    for (const key in queryDto) {
      if (queryDto.hasOwnProperty(key) && key.startsWith('with')) {
        withKeys[key] = queryDto[key];
        delete remainingWhereProps[key];
      }
    }

    return { withKeys, remainingWhereProps };
  }

  private handleIncluseClauses(withKeys) {
    const include: any = {};
    for (const key in withKeys) {
      const includeKey = key.replace(/^with/, '').toLowerCase();
      include[includeKey] = true;
    }

    return include;
  }

  private handleWhereClauses(remainingWhereProps) {
    const where: any = {};
    for (const [key, value] of Object.entries(remainingWhereProps)) {
      if (typeof value == 'boolean') {
        where[key] = value;
        continue;
      }

      if (value !== undefined) {
        where[key] = { contains: value };
      }
    }

    return where;
  }
}
