import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from './users/users.module';
import {AuthModule} from "./auth/auth.module";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        UsersModule,
        AuthModule,
        PassportModule,
    ],
    controllers: [
        AppController,
        AuthController,
    ],
    providers: [
        AppService,
        AuthService
    ],
    exports: [AuthService],
})
export class AppModule {
}
