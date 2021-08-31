import { Service } from 'typedi';
import demoModel from '../models/demo.model';

@Service()
export class DemoRepository {
  public async createDemo(name: string, type: string) {
    return demoModel.create({ name, type });
  }

  public async getByName(name: string) {
    return demoModel.findOne({ name });
  }
}
