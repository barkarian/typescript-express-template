import {DataSource} from "typeorm";
import {User} from "@entities/User";
import {Message} from "@entities/Message";

export const nonRelationalDataSource: DataSource = null;

export const relationalDataSource = new DataSource({
    //sqlite is a database that is going to be created in a file on project root
    type: "sqlite",
    database: "mydb.sql",
    entities: [
        // 'src/entities/**{.ts,.js}',
        User, Message
    ],
    synchronize: true
});