
import { JsonController, Post, Get, Body, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { DemoService } from '../services/DemoService';
import { DemoBody } from './req/DemoBodyReq';

@JsonController('/demo')
@OpenAPI({ security: [{ access_token: [] }] })
export class DemoController {
  constructor(private demoService: DemoService) { }

  @Get('/:name')
  public async getByName(@Param('name') name: string) {
    return this.demoService.getByName(name);
  }

  @Post('/')
  public async create(@Body() body: DemoBody) {
    return this.demoService.create(body.name, body.type);
  }
}
