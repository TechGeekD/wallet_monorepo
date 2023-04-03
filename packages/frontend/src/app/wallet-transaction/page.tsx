"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@styles/wallet.module.css";

import { useLocalStorage } from "../../utils";
import WalletTransactionDetailsPage from "./[id]/page";

const transactWallet = async (
	walletId: string,
	description: string,
	amount: number,
	type: "DEBIT" | "CREDIT",
) => {
	try {
		const gqlQuery = {
			query: `mutation transactWallet($walletId: String!, $description: String!, $amount: Float!, $type: WALLET_TX_TYPE!) {
				walletTransaction: transactWallet(
				  transactWalletInput: {walletId: $walletId, description: $description, amount: $amount, type: $type}
				) {
				  id
				  walletId
				  amount
				  description
				  balance
				  transactionId
				  type
				}
			  }`,
			variables: {
				walletId,
				description,
				amount,
				type,
			},
		};

		const options: RequestInit = {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(gqlQuery),
			cache: "no-store",
		};

		const res = await fetch(`/api/graphql`, options);
		return res.json();
	} catch (error) {
		console.log("### transactWallet ###");
		console.log(error);
		return { errors: [error] };
	}
};

const WalletTransactionPage = () => {
	const [walletId, setWalletId] = useLocalStorage("walletId", "");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const [type, setType] = useState<"DEBIT" | "CREDIT">("DEBIT");
	const router = useRouter();

	const handleForm = async event => {
		event.preventDefault();

		const { data, errors } = await transactWallet(walletId, description, amount, type);

		if (errors) {
			errors.forEach(error => {
				alert(`Error: ${error.message}`);
			});
			return;
		}

		setWalletId(data?.walletTransaction?.walletId);

		// else successful
		return router.replace(
			WalletTransactionDetailsPage.routeName(data?.walletTransaction?.walletId) +
				`?u=${Math.round(Math.random())}`,
		);
	};

	const handleTypeClick = () => {
		if (type == "CREDIT") setType("DEBIT");
		else {
			if (amount < 0) setAmount(-amount);
			setType("CREDIT");
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<h1 className={styles.h1}>Wallet Setup</h1>
				<form onSubmit={handleForm} className={styles.form}>
					<label className={styles.label} htmlFor="description">
						<p className={styles.p}>Enter Description</p>
						<input
							className={styles.input}
							onChange={e => setDescription(e?.target?.value ?? "")}
							required
							type="string"
							name="description"
							id="description"
							placeholder="description"
						/>
					</label>
					<label className={styles.label} htmlFor="amount">
						<p className={styles.p}>Enter Amount</p>
						<input
							className={styles.input}
							onChange={e => {
								const amount = parseFloat(e?.target?.value ?? "0");
								if (amount < 0) setType("DEBIT");
								setAmount(amount);
							}}
							value={amount}
							required
							type="number"
							name="amount"
							id="amount"
							placeholder="Amount"
						/>
					</label>
					<label className={styles.label}>
						<p className={styles.p}>Select Transaction Type</p>
					</label>
					<div className={styles.center}>
						<div className={styles["toggle-pill-color"]}>
							<input
								type="checkbox"
								id="pill"
								name="check"
								value={type}
								checked={type == "CREDIT"}
								onChange={handleTypeClick}
							/>
							<label htmlFor="pill"></label>
						</div>
					</div>
					<div className={styles.center}>
						<label className={styles.label}>
							<p className={styles.p}>{type} Transaction</p>
						</label>
					</div>
					<br></br>
					<button className={styles.button} type="submit">
						Do Transaction
					</button>
				</form>
			</div>
		</div>
	);
};

WalletTransactionPage.routeName = () => `/wallet-transaction`;
export default WalletTransactionPage;
