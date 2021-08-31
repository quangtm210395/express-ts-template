import { IsString } from 'class-validator';

export class DemoBody {
  @IsString()
  name: string;

  @IsString()
  type: string;
}
