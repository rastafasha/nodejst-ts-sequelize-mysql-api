import { DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';


interface AddressAttributes {
  id?: number,
  userId?: number | null,
  phone1?: string | null,
  phone2?: string | null,
  type?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,

  createdAt?: Date,
  uppdatedAt?: Date,

}

export interface AddressInput extends Optional<AddressAttributes, 'id'>{}
export interface AddressOutput extends Required<AddressAttributes>{}

class Address extends Model<AddressAttributes, AddressInput> implements AddressAttributes{
  public id!: number;
  public userId!: number;
  public phone1!: string;
  public phone2!: string;
  public type!: string;
  public city!: string;
  public state!: string;
  public zip!: string;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

Address.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  userId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  type: {
    allowNull: true,
    type: DataTypes.STRING
  },
  phone1: {
    allowNull: true,
    type: DataTypes.STRING
  },
  phone2: {
    allowNull: true,
    type: DataTypes.STRING
  },
  city: {
    allowNull: true,
    type: DataTypes.STRING
  },
  state: {
    allowNull: true,
    type: DataTypes.STRING
  },
  zip: {
    allowNull: true,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

Address.belongsTo(User, {foreignKey: "userId"});

export default Address;