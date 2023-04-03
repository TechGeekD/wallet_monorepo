import Link from "next/link";
import styles from "@styles/wallet.module.css";
import WalletLogoutPage from "./[logout]";
import WalletTransactionDetailsPage from "@/app/wallet-transaction/[id]/page";

const getWalletData = async (walletId: string) => {
	try {
		const gqlQuery = {
			query: `query getWallet($walletId: String!) {
				wallet: getWallet(walletId: $walletId) {
				  name
				  balance
				}
			  }`,
			variables: { walletId },
		};

		const options: RequestInit = {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(gqlQuery),
			cache: "no-store",
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/graphql`, options);
		return res.json();
	} catch (error) {
		console.log("### getWalletData ###");
		console.log(error);
		return { errors: [error] };
	}
};

const WalletDetailPage = async ({ params }) => {
	const walletId = params.id;
	const { data, errors } = await getWalletData(walletId);

	if (errors) return <p>Error loading wallet</p>;

	const {
		wallet: { name, balance },
	} = data;

	if (!name) return <p>No Wallet data</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<h1 className={styles.h1}>{name}&apos;s Wallet Balance</h1>
				<form className={styles.form}>
					<label className={styles.label} htmlFor="balance">
						<p className={styles.p}>${balance}</p>
					</label>
					<Link href={WalletTransactionDetailsPage.routeName(walletId)} className="text-center">
						<button className={styles.button}>See Wallet Transactions</button>
					</Link>
					<WalletLogoutPage />
				</form>
			</div>
		</div>
	);
};

WalletDetailPage.routeName = (walletId: string) => `/wallet/${walletId}`;

export default WalletDetailPage;
