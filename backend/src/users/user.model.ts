import {Base} from '@typegoose/typegoose/lib/defaultClasses';
import {HydratedDocument, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel implements Base {
    @Prop()
    role: string;
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
}

export const UserSchema = SchemaFactory.createForClass(UserModel);