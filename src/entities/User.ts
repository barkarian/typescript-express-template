import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsUUID,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber
} from "class-validator";
import {Exclude, Expose} from "class-transformer";
import {Message} from "./Message";

// const phoneNumberId = "100144899625999";//TODO from config
// const accessToken = "EAAQdrF4r9xUBACZBZAwC11mgTgMymA9zhtZBDch3IYU78g17wWNHM4LvZAj7cErAI8yER2sZAiFZCsB7WFqfv50aa3DLkhavXMT8fVrRs9nukbJs7b0fzs5HJ7ARLJDfPgd7Gk0CUN0hCXfg6aZBKxjWb3vuZAkKTW7WKkD3wTsDZB9cfx07x3jE8vtuWtx1cHgCKwQrUX0YyzQZDZD";//from config
// const messagingProduct = "whatsapp";
// const to = "306931259667";//TODO from request
// const type = "template";
// const template = { name: "hello_world", language: { code: "en_US" } };//TODO name from request

@Entity()
export class User {
    @PrimaryColumn({nullable: false}) //for typeorm
    @Expose() //for class transformer tell it to expose those fields (not letting other properties inside the object)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Expose() //for class transformer tell it to expose those fields (not letting other properties inside the object)
    @Column({nullable: false})
    @IsNotEmpty()
    password: string;

    @Column({nullable: true})
    accessToken: string;

    @OneToMany(type => Message, message => message.id)
    messages: Message[];
}