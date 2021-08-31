import { Service } from 'typedi';
import { DemoModel } from '../models/demo.model';

@Service()
export class DemoRepository {
  public async createDemo(name: string, type: string) {
    return DemoModel.create({ name, type });
  }

  public async getByName(name: string) {
    return DemoModel.findOne({ name });
  }
  public async updateDemo(id: string, name: string, type: string) {
    return DemoModel.findOneAndUpdate({ _id: id }, { $set: { name, type } }, { new: true });
  }
}
