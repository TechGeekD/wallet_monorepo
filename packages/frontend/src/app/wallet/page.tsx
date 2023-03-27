"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@styles/wallet.module.css";

import { useLocalStorage } from "../../utils";

const setupWalletData = async (userName: string, balance: number) => {
	try {
		const gqlQuery = {
			query: `mutation setupWallet($userName: String!, $balance: Float) {
				wallet: setupWallet(
				  setupWalletInput: { name: $userName, balance: $balance }
				) {
				  id,
				  name
				  balance
				}
			  }`,
			variables: { userName, balance },
		};

		const options: RequestInit = {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(gqlQuery),
			cache: "no-store",
		};

		console.log(`/api/graphql`, "NEXT_PUBLIC_FRONTEND_URL");
		const res = await fetch(`/api/graphql`, options);
		console.log("--- getWalletData ---");
		console.log(typeof res);
		return res.json();
	} catch (error) {
		return { error };
	}
};

const WalletSetupPage = ({ params }) => {
	const [walletId, setWalletId] = useLocalStorage("walletId", params.id ?? "");
	const [userName, setUserName] = useState("");
	const [balance, setBalance] = useState(0);
	const router = useRouter();

	// if (walletId.length) return router.replace(`wallet/${walletId}`);

	const handleForm = async event => {
		event.preventDefault();

		if (walletId.length) return router.replace(`wallet/${walletId}`);

		const { data, error } = await setupWalletData(userName, balance);
		console.log("*** getWalletData ***");
		console.log(data);

		setWalletId(data?.wallet?.id);

		if (error) {
			return console.log(error);
		}

		// else successful
		return router.replace(`wallet/${data?.wallet?.id}`);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<h1 className={styles.h1}>Wallet Setup</h1>
				<form onSubmit={handleForm} className={styles.form}>
					<label className={styles.label} htmlFor="userName">
						<p className={styles.p}>Enter Your Name</p>
						<input
							className={styles.input}
							onChange={e => setUserName(e.target.value)}
							required
							type="string"
							name="userName"
							id="userName"
							placeholder="Your Name"
						/>
					</label>
					<label className={styles.label} htmlFor="balance">
						<p className={styles.p}>Enter Initial Balance</p>
						<input
							className={styles.input}
							value={balance}
							onChange={e => setBalance(parseFloat(e.target.value))}
							type="number"
							name="balance"
							id="balance"
							placeholder="Balance"
						/>
					</label>
					<br></br>
					<button className={styles.button} type="submit">
						Create Wallet
					</button>
				</form>
			</div>
		</div>
	);
};

export default WalletSetupPage;
