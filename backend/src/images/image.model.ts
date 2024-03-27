import {HydratedDocument, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<Image>;

@Schema()
export class Image {

    @Prop()
    link: string;
}

export const UserSchema = SchemaFactory.createForClass(Image);