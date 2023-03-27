import { Field, Float, ObjectType, OmitType } from "@nestjs/graphql";
import { Wallet, WalletTransaction } from "../schemas";

@ObjectType("WalletOutput")
export class WalletOutput extends OmitType(Wallet, ["id"] as const) {
	@Field({ description: "Wallet id field" })
	id: string;
}

@ObjectType("walletTransactionOutput")
export class WalletTransactionOutput extends OmitType(WalletTransaction, ["id"] as const) {
	@Field({ description: "Wallet id field" })
	id: string;

	@Field(() => String, { description: "transactionId field", nullable: true })
	readonly transactionId: string;

	@Field(() => Float, { description: "balance field", nullable: true })
	readonly balance: number;
}
