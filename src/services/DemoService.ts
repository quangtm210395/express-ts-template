import { DemoRepository } from './../repo/DemoRepository';
import 'reflect-metadata';

import { Service } from 'typedi';

@Service()
export class DemoService {
  constructor(private demoRepository: DemoRepository) { }

  async create(name: string, type: string) {
    const created = await this.demoRepository.createDemo(name, type);
    return created.toJSON();
  }

  async getByName(name: string) {
    const demo = await this.demoRepository.getByName(name);
    return demo.toJSON();
  }

  async update(id: string, name: string, type: string) {
    const updated = await this.demoRepository.updateDemo(id, name, type);
    return updated.toJSON();
  }
}
