import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
export type UserLogDocument=HydratedDocument<UserLog>;
@Schema()
export class UserLog{
    @Prop()
    user_id:string;
    @Prop()
    user_activity:string;
    @Prop({default:Date.now})
    created_at:Date;
}

export const UserLogSchema=SchemaFactory.createForClass(UserLog)