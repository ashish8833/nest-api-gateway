import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { v7 as uuidv7 } from 'uuid';

@Table({
  tableName: 'users',
  schema: 'auth',
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv7(),
    primaryKey: true,
  })
  uuid: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  salt: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;
}
