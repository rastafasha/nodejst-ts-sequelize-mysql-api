import { DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';


interface CommentAttributes {
  id?: number,
  productId?: number | null,
  userId?: number | null,
  tutorialId?: number | null,
  name?: string | null,
  text?: string | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface CommentInput extends Optional<CommentAttributes, 'id'>{}
export interface CommentOutput extends Required<CommentAttributes>{}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes{
  public id!: number;
  public productId!: number;
  public userId!: number;
  public tutorialId!: number;
  public name!: string;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

Comment.init({
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
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  text: {
    allowNull: true,
    type: DataTypes.TEXT
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

Comment.belongsTo(User, {foreignKey: "userId"});

export default Comment;