import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { TempSchema } from "./temp.schema";
@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            port: 5455,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            models: [TempSchema],
            autoLoadModels: true
        })
    ]
})
export class DatabaseModule { }