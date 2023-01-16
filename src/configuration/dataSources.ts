import {DataSource} from "typeorm";
import {User} from "@entities/User";
import {Message} from "@entities/Message";

export const nonRelationalDataSource: DataSource = null;

export const relationalDataSource = new DataSource({
    type: "sqlite",
    database: "mydb.sql",
    entities: [
        // 'src/entities/**{.ts,.js}',
        User, Message
    ],
    synchronize: true
});