import { DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';


interface CategoryAttributes {
  id?: number,
  name?: string | null,
  description?: string | null,
  active?: boolean | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface CategoryInput extends Optional<CategoryAttributes, 'id'>{}
export interface CategoryOutput extends Required<CategoryAttributes>{}

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes{
  public id!: number;
  public name!: string;
  public description!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

Category.init({
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
  description: {
    allowNull: true,
    type: DataTypes.TEXT
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


export default Category;