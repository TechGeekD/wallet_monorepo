import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { WalletService } from "./wallet.service";
import { WalletResolver } from "./wallet.resolver";

import { Wallet, WalletSchema, WalletTransaction, WalletTransactionSchema } from "./schemas";
import { roundUpTo4DecimalPlaces } from "@core/utils";

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Wallet.name,
				useFactory: () => {
					const schema = WalletSchema;
					schema.pre("save", function (next) {
						this.balance = roundUpTo4DecimalPlaces(this.balance);
						Logger.debug(`Wallet pre (save): ${this.balance}`);
						next();
					});
					schema.pre("updateOne", async function (next) {
						const docToUpdate = await this.model.findOne(this.getQuery());
						const balance = roundUpTo4DecimalPlaces(docToUpdate.balance);
						this.set({ balance });
						Logger.debug(`Wallet pre (updateOne): ${balance}`);
						next();
					});
					return schema;
				},
			},
			{
				name: WalletTransaction.name,
				useFactory: () => {
					const schema = WalletTransactionSchema;
					schema.pre("save", function (next) {
						this.amount = roundUpTo4DecimalPlaces(this.amount);
						Logger.debug(`WalletTransaction pre (save): ${this.amount}`);
						next();
					});
					schema.pre("updateOne", async function (next) {
						const docToUpdate = await this.model.findOne(this.getQuery());
						const amount = roundUpTo4DecimalPlaces(docToUpdate.amount);
						this.set({ amount });
						Logger.debug(`WalletTransaction pre (updateOne): ${amount}`);
						next();
					});
					return schema;
				},
			},
		]),
	],
	providers: [WalletResolver, WalletService],
})
export class WalletModule {}
