import { DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';
import Review from './review';
import Comment from './comment';
import Category from './category';


interface ProductAttributes {
  id?: number,
  userId?: number,
  name?: string | null,
  image?: string | null,
  price?: number | null,
  description?: string | null,
  published?: boolean | null,
  active?: boolean | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface ProductInput extends Optional<ProductAttributes, 'id'>{}
export interface ProductOutput extends Required<ProductAttributes>{}

class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes{
  public id!: number;
  public userId!: number;
  public name!: string;
  public image!: string;
  public price!: number;
  public description!: string;
  public published!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

Product.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  },
  price: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  published: {
    allowNull: true,
    type: DataTypes.BOOLEAN
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

// Product.belongsTo(User, {foreignKey: "userId"});
// Product.belongsTo(Review, {foreignKey: "productId"});
// Product.belongsTo(Comment, {foreignKey: "productId"});
// Product.belongsTo(Category, {foreignKey: "productId"});

export default Product;