import {DataType, DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';
import Role from './role';


interface UserAttributes {
  id?: number,
  roleId?: number | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  password?: string | null,
  accessToken?: string | null,
  image?: string | null,
  active?: boolean | null,
  verified?: boolean | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface UserInput extends Optional<UserAttributes, 'id'>{}
export interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes, UserInput> implements UserAttributes{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public verified!: boolean;
  public accessToken!: string;
  public image!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  firstName: {
    allowNull: true,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING
  },
  
  password: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  roleId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  verified: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  accessToken: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  },
  active:{
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

User.belongsTo(Role, {foreignKey: "roleId"});

export default User;