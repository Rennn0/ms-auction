import { ACCESS_LEVEL } from "@core/access_levels";
import { CLIENT_TYPE } from "@core/client_types";
import { __postgres } from "@memory/postgre";
import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    user_id?: string; // auto generated fieldia
    username: string;
    email: string;
    password_salt?: string;
    password_hash?: string;
    client_type: string; // enumia
    access_level: string; // esec enumia
    using_gmail: boolean;
}

export const UserModel = (sequelize: Sequelize) => sequelize.define<Model<UserAttributes>>("Users",
    {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password_salt: {
            type: DataTypes.TEXT,
        },
        password_hash: {
            type: DataTypes.TEXT
        },
        client_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(CLIENT_TYPE)
        },
        access_level: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(ACCESS_LEVEL)
        },
        using_gmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })