import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDecimal, IsPositive, IsString } from "class-validator";
import { Document, Schema as sc } from "mongoose";

export interface WalletDocument extends Wallet, Document {}

@Schema({
	timestamps: true,
})
@ObjectType("Wallet")
@InputType("WalletInput")
export class Wallet {
	id?: any;

	@Prop({
		required: true,
	})
	@Type(() => Number)
	@IsDecimal()
	@IsPositive()
	@ApiProperty({ type: Number })
	@Field(() => Float, { description: "balance field", nullable: true })
	balance?: number;

	@Prop({
		required: true,
	})
	@IsString()
	@ApiProperty()
	@Field({ description: "name field" })
	readonly name: string;

	readonly createdAt?: Date;
	readonly toResponseJSON?: Function;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.methods.toResponseJSON = function (this: Document<Wallet, any, any>) {
	const inst = this as WalletDocument;
	return {
		id: inst._id,
		balance: inst.balance,
		name: inst.name,
		date: inst.createdAt,
	};
};
