import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { WalletService } from "./wallet.service";

import { UpdateWalletInput } from "./dto/update-wallet.input";
import { Wallet, WalletTransaction } from "./schemas";
import { WalletOutput, WalletTransactionOutput } from "./dto";
import { ValidationPipe } from "@nestjs/common";

@Resolver(() => Wallet)
export class WalletResolver {
	constructor(private readonly walletService: WalletService) {}

	@Mutation(() => WalletOutput)
	createWallet(
		@Args("createWalletInput", new ValidationPipe({ skipMissingProperties: true }))
		walletData: Wallet,
	) {
		return this.walletService.createWallet(walletData);
	}

	@Query(() => [WalletOutput])
	findAll() {
		return this.walletService.findAll();
	}

	@Query(() => WalletOutput)
	findOneWallet(@Args("id", { name: "findOneWalletInput" }) id: string) {
		return this.walletService.findOneWallet({ id });
	}

	@Mutation(() => WalletOutput)
	updateWallet(
		@Args("updateWalletInput", new ValidationPipe({ skipMissingProperties: true }))
		updateWalletInput: UpdateWalletInput,
	) {
		return this.walletService.update(updateWalletInput.id, updateWalletInput);
	}

	@Mutation(() => WalletOutput)
	removeWallet(@Args("id", { name: "removeWalletInput", type: () => Int }) id: number) {
		return this.walletService.remove(id);
	}

	@Mutation(() => WalletOutput)
	setupWallet(@Args("setupWalletInput") walletData: Wallet) {
		return this.walletService.setupWallet(walletData);
	}

	@Mutation(() => WalletTransactionOutput)
	transactWallet(
		@Args("transactWalletInput", new ValidationPipe({ skipMissingProperties: true }))
		transactWalletInput: WalletTransaction,
	) {
		return this.walletService.transact(transactWalletInput);
	}

	@Query(() => [WalletTransactionOutput])
	getAllWalletTransaction(
		@Args("walletId", { name: "walletId" }) walletId: string,
		@Args("page", { name: "skip", type: () => Int }) skip: number,
		@Args("limit", { name: "limit", type: () => Int }) limit: number,
	) {
		return this.walletService.getTransactions(walletId, skip, limit);
	}

	@Query(() => WalletOutput)
	getWallet(@Args("walletId", { name: "walletId" }) walletId: string) {
		return this.walletService.getWallet(walletId);
	}
}
