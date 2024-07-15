import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "../entity/users.entity";


@Injectable()
export class UserService {
    constructor(@InjectModel(Users) private userModel: typeof Users) { }
}