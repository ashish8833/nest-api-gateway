import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./entity/users.entity";


@Module({
    imports: [
        SequelizeModule.forFeature([Users])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class UserModule { }