import { Injectable } from '@nestjs/common';
import { CreateGraphqlInput } from './dto/create-graphql.input';
import { UpdateGraphqlInput } from './dto/update-graphql.input';

@Injectable()
export class GraphqlService {
  findAll() {
    return `This action returns all graphql`;
  }
}
