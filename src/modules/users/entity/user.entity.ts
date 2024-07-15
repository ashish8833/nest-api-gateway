import { AllowNull, Column, CreatedAt, DataType, Default, Model, Table, UpdatedAt } from "sequelize-typescript";
import { v7 as uuidv7 } from 'uuid';


@Table({
    tableName: 'users',
    schema: 'auth'
})
export class Users extends Model<Users> {

    @Column({
        type: DataType.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    })
    uuid: string;

    @Column({
        type: DataType.STRING,
    })
    @AllowNull(false)
    firstName: string;

    @Column({
        type: DataType.STRING,
    })
    @AllowNull(false)
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    @AllowNull(false)
    email: string;

    @Column({
        type: DataType.STRING,
    })
    @AllowNull(false)
    salt: string;

    @Column({
        type: DataType.STRING,
    })
    @AllowNull(false)
    password: string;

    @Column({
        type: DataType.BOOLEAN
    })
    @Default(true)
    isActive: boolean;

}