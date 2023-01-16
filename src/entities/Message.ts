import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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
  IsNotEmpty
} from "class-validator";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  sender: string;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  receiver: string;

  @Column()
  @IsDate()
  sentAt: Date;

  @ManyToOne(type => User, user => user.email)
  senderUser: User;

  @ManyToOne(type => User, user => user.email)
  receiverUser: User;
}