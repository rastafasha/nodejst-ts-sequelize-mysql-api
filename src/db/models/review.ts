import { DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';


interface ReviewAttributes {
  id?: number,
  productId?: number | null,
  userId?: number | null,
  tutorialId?: number | null,
  rating?: number | null,
  description?: string | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface ReviewInput extends Optional<ReviewAttributes, 'id'>{}
export interface ReviewOutput extends Required<ReviewAttributes>{}

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes{
  public id!: number;
  public productId!: number;
  public userId!: number;
  public tutorialId!: number;
  public rating!: number;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

Review.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  productId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  userId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  tutorialId: {
    allowNull: true,
    type: DataTypes.STRING
  },
  rating: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

Review.belongsTo(User, {foreignKey: "userId"});

export default Review;