import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
	Wallet,
	WalletDocument,
	WalletTransaction,
	WalletTransactionDocument,
	WALLET_TX_TYPE,
} from "./schemas";

import { UpdateWalletInput } from "./dto/update-wallet.input";
import { randomUUID } from "crypto";

@Injectable()
export class WalletService {
	constructor(
		@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
		@InjectModel(WalletTransaction.name)
		private walletTransactionModel: Model<WalletTransactionDocument>,
	) {}

	roundUpTo4DecimalPlaces(num: number): number {
		const precision = 4;
		const roundingFactor = Math.pow(10, precision);
		return Math.ceil(num * roundingFactor) / roundingFactor;
	}

	async createWallet(walletData: Wallet) {
		const balance = this.roundUpTo4DecimalPlaces(walletData.balance);
		const wallet = new this.walletModel({ ...walletData, balance });
		return wallet.save();
	}

	async createWalletTransaction(walletTransactionData: WalletTransaction) {
		const balance = this.roundUpTo4DecimalPlaces(walletTransactionData.balance);
		const walletTransaction = new this.walletTransactionModel({
			...walletTransactionData,
			balance,
		});
		return walletTransaction.save();
	}

	findAll() {
		return [{ name: `This action returns all wallet` }];
	}

	findByIdWallet(walletId: string) {
		return this.walletModel.findById(walletId).select("-__v");
	}

	findOneWallet(walletData: UpdateWalletInput) {
		return this.walletModel.findOne({ ...walletData }).select("-__v");
	}

	update(id: string, updateWalletInput: UpdateWalletInput) {
		return {
			name: `This action updates a #${id} wallet: ${JSON.stringify(updateWalletInput)}`,
		};
	}

	remove(id: number) {
		return { name: `This action removes a #${id} wallet` };
	}

	async setupWallet(walletData: Wallet): Promise<any> {
		const balance = walletData.balance ?? 0;
		const savedWallet = await this.createWallet({ ...walletData, balance });

		const transaction = await this.createWalletTransaction({
			walletId: savedWallet._id,
			amount: savedWallet.balance,
			balance: savedWallet.balance,
			type: WALLET_TX_TYPE.CREDIT,
			transactionId: randomUUID(),
			description: `Wallet created with balance ${savedWallet.balance}`,
		});

		return {
			id: savedWallet._id,
			balance: savedWallet.balance,
			transactionId: transaction.transactionId,
			name: savedWallet.name,
			date: transaction.createdAt,
		};
	}

	async transact(transactWalletInput: WalletTransaction): Promise<any> {
		const wallet = await this.findByIdWallet(transactWalletInput.walletId);
		if (!wallet) {
			return { message: "Wallet not found" };
		}

		const amount = transactWalletInput.amount;

		if (amount === 0) {
			return { message: "Invalid amount" };
		}

		if (wallet.balance + amount < 0) {
			return { message: "Insufficient balance" };
		}

		if (WALLET_TX_TYPE.CREDIT == transactWalletInput.type) wallet.balance += amount;
		if (WALLET_TX_TYPE.DEBIT == transactWalletInput.type) wallet.balance -= amount;
		if (amount < 0) wallet.balance -= -amount;

		const transaction: WalletTransaction = await this.createWalletTransaction({
			walletId: wallet._id,
			amount,
			balance: wallet.balance,
			type: transactWalletInput.type,
			transactionId: randomUUID(),
			description: transactWalletInput.description,
		});

		await Promise.all([transaction, wallet.save()]);

		return {
			id: transaction.id,
			amount: this.roundUpTo4DecimalPlaces(transaction.amount),
			balance: transaction.balance,
			description: transaction.description,
			walletId: transaction.walletId,
			transactionId: transaction.transactionId,
			createdAt: transaction.createdAt,
			type: transaction.type,
		};
	}

	async getTransactions(walletId: string, skip = 0, limit = 10): Promise<any> {
		const transactions: WalletTransactionDocument[] = await this.walletTransactionModel
			.find({ walletId })
			.skip(limit * skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.select("-__v -walletId");

		Logger.debug(transactions, skip, limit, "****** transactions ******");
		return transactions.map(t => ({ ...t.toResponseJSON(), walletId }));
	}

	async getWallet(id: string): Promise<any> {
		const wallet = await this.findByIdWallet(id);
		if (!wallet) {
			return { message: "Wallet not found" };
		}

		return wallet.toResponseJSON();
	}
}