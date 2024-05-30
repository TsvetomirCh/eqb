import { Injectable } from '@nestjs/common';

/**
 * Mocking elastic functionality
 *
 */
@Injectable()
export class SearchService {
  async indexResource(resource: string, data: any): Promise<void> {
    console.log(`Calling elastic indexResource ${resource}`, data);

    // await this.elasticsearchService.index({
    //   index: resource,
    //   id: data.id.toString(),
    //   body: data,
    // });
  }

  async removeResource(resource: string, id: number): Promise<void> {
    console.log(`Calling elastic removeResource ${resource} for id: ${id}`);

    // await this.elasticsearchService.delete({
    //   index: resource,
    //   id: id.toString(),
    // });
  }
}
