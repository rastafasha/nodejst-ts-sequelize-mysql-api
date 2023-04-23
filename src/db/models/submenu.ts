import {DataType, DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';


interface SubMenuAttributes {
  id?: number,
  masterMenuId?: number | null,
  name?: string | null,
  title?: string | null,
  url?: string | null,
  icon?: string | null,
  ordering?: number | null,
  isTargetSelf?: boolean | null,
  active?: boolean | null,

  createdAt?: Date,
  uppdatedAt?: Date,


}

export interface SubMenuInput extends Optional<SubMenuAttributes, 'id'>{}
export interface SubMenuOutput extends Required<SubMenuAttributes>{}

class SubMenu extends Model<SubMenuAttributes, SubMenuInput> implements SubMenuAttributes{
  public id!: number;
  public masterMenuId!: number;
  public name!: string;
  public title!: string;
  public url!: string;
  public icon!: string;
  public ordering!: number;
  public isTargetSelf!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly uppdatedAt!: Date;
}

SubMenu.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  masterMenuId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING
  },
  url: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  icon: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  ordering: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  isTargetSelf:{
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


export default SubMenu;