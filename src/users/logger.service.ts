import { UserLog,UserLogDocument } from './user_log.schema';
import { UserLogDto } from './user-log.dto';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';


  @Injectable()
  export class LoggerService {
  
  constructor(@InjectModel(UserLog.name) private logModel: Model < UserLogDocument > ) {}
  
    async log(userLogdto:UserLogDto){
        const createlog= new this.logModel(userLogdto);
        return createlog.save();
    }
  
}