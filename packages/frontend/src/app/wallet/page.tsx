"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@styles/wallet.module.css";

import { useLocalStorage } from "../../utils";
import WalletDetailPage from "./[id]/page";

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

		const res = await fetch(`/api/graphql`, options);
		return res.json();
	} catch (error) {
		console.log("### setupWalletData ###");
		console.log(error);
		return { errors: [error] };
	}
};

const WalletSetupPage = () => {
	const [, setWalletId] = useLocalStorage("walletId", "");
	const [userName, setUserName] = useState("");
	const [balance, setBalance] = useState(0);
	const router = useRouter();

	const handleForm = async event => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const { data, errors } = await setupWalletData(userName, balance);

		if (errors) {
			errors.forEach(error => {
				alert(`Error: ${error.message}`);
			});
			return;
		}

		setWalletId(data?.wallet?.id);

		// else successful
		return router.replace(WalletDetailPage.routeName(data?.wallet?.id));
	};

	const validateForm = () => {
		const balanceElem: HTMLInputElement = document.querySelector("#balance");

		const isValidForm: boolean = balanceElem.value && parseFloat(balanceElem.value) >= 0;

		if (!isValidForm) {
			alert("Please enter valid balance (in positive value).");
		}

		return isValidForm;
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
							onChange={e => setUserName(e?.target?.value ?? "")}
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
							onChange={e => setBalance(parseFloat(e?.target?.value ?? "0"))}
							type="number"
							// inputMode="numeric"
							name="balance"
							id="balance"
							placeholder="Balance"
							required
							minLength={1}
							pattern="[0-9]{1,15}"
							title="Enter balance value in positive number"
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
