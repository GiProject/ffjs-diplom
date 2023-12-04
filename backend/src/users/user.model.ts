import {Base} from '@typegoose/typegoose/lib/defaultClasses';
import {HydratedDocument, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements Base {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    id: string;

    @Prop()
    email: string;

    @Prop()
    passwordHash: string;

    @Prop()
    name: string;

    @Prop()
    contactPhone: string;

    @Prop({ required: true, default: 'client' })
    public role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);