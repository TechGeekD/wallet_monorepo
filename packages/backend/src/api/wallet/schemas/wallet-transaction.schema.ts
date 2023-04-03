import { Field, Float, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsPositive, IsString } from "class-validator";
import { Document, Schema as sc } from "mongoose";
import { Wallet } from "./wallet.schema";

export enum WALLET_TX_TYPE {
	CREDIT = "CREDIT",
	DEBIT = "DEBIT",
}

registerEnumType(WALLET_TX_TYPE, {
	name: "WALLET_TX_TYPE",
	description: "The supported colors.",
	valuesMap: {
		CREDIT: {
			description: "Wallet Credit Transaction",
		},
		DEBIT: {
			description: "Wallet DEBIT Transaction",
		},
	},
});

export interface WalletTransactionDocument extends WalletTransaction, Document {}

@Schema({
	timestamps: true,
})
@ObjectType("WalletTransaction")
@InputType("WalletTransactionInput")
export class WalletTransaction {
	id?: any;

	@Prop({
		required: true,
	})
	@Field(() => String, { description: "description field" })
	@IsString()
	@ApiProperty()
	readonly description: string;

	@Prop({
		required: true,
	})
	// @Field(() => String, { description: "transactionId field", nullable: true })
	@IsString()
	@ApiProperty()
	readonly transactionId: string;

	@Prop({
		type: sc.Types.ObjectId,
		ref: Wallet.name,
		required: true,
		index: true,
	})
	@Field(() => String, { description: "walletId field" })
	@IsString()
	@ApiProperty()
	readonly walletId: string;

	@Prop({
		required: true,
	})
	@Field(() => Float, { description: "amount field" })
	@Type(() => Number)
	@IsNumber()
	@ApiProperty()
	readonly amount: number;

	@Prop({
		required: true,
	})
	// @Field(() => Float, { description: "balance field", nullable: true  })
	@Type(() => Number)
	@IsNumber()
	@IsPositive()
	@ApiProperty()
	readonly balance: number;

	@Prop({
		required: true,
		type: String,
		enum: Object.values(WALLET_TX_TYPE),
		default: WALLET_TX_TYPE.CREDIT,
		index: true,
	})
	@Field(() => WALLET_TX_TYPE, { description: "type field" })
	@Transform(type => type.value.toUpperCase())
	@IsEnum(WALLET_TX_TYPE)
	@ApiProperty({ enum: Object.values(WALLET_TX_TYPE) })
	type: WALLET_TX_TYPE;

	@Field(() => Date, { description: "created at field", nullable: true })
	readonly createdAt?: Date;
	readonly toResponseJSON?: Function;
}

export const WalletTransactionSchema = SchemaFactory.createForClass(WalletTransaction);

WalletTransactionSchema.methods.toResponseJSON = function (this: WalletTransaction) {
	return {
		id: this.id,
		walletId: this.walletId,
		transactionId: this.transactionId,
		amount: this.amount,
		balance: this.balance,
		description: this.description,
		type: this.type,
		date: this.createdAt,
	};
};
