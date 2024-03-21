import { Column, Model, Table } from "sequelize-typescript";

@Table
export class TempSchema extends Model {
    @Column
    name: string
}