import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose";
import {Document} from 'mongoose';
  
export type UserDocument = User & Document;
  
  @Schema()
  export class User {
    @Prop({
      required: true
    })
    username: string;
    @Prop({
      required: true
    })
    first_name: string;
    @Prop({
      required: true
    })
    last_name: string;
    @Prop({
      required: true
    })
    status: string;
    @Prop({
      required: true
    })
    user_type: string;
    @Prop({
      required: true
    })
    password: string;
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);