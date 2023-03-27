import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { WalletService } from "./wallet.service";
import { WalletResolver } from "./wallet.resolver";

import { Wallet, WalletSchema, WalletTransaction, WalletTransactionSchema } from "./schemas";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Wallet.name, schema: WalletSchema },
			{ name: WalletTransaction.name, schema: WalletTransactionSchema },
		]),
	],
	providers: [WalletResolver, WalletService],
})
export class WalletModule {}
