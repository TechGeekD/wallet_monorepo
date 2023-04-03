import Link from "next/link";
import styles from "@styles/wallet-transactions.module.css";
import WalletCardPage from "./[card]";
import WalletDetailPage from "@/app/wallet/[id]/page";

const runGqlProxy = async gqlQuery => {
	const options: RequestInit = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(gqlQuery),
		cache: "no-store",
	};

	const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/graphql`, options);
	console.log("=== gqlProxyData ===");
	return res.json();
};

const getWalletTransactionsData = async (walletId: string, page = 0, limit = 5) => {
	try {
		const gqlQuery = {
			query: `query getWalletTransactions($walletId: String!, $page: Int!, $limit: Int!) {
				walletTransactions: getAllWalletTransaction(
				  walletId: $walletId
				  skip: $page
				  limit: $limit
				) {
				  Description: description
				  Wallet_Balance: balance
				  Wallet_Amount: amount
				  Wallet_Id: walletId
				  Transaction_Id: transactionId
				  Transaction_Type: type
				  Date: date
				}
			  }`,
			variables: { walletId, page, limit },
		};

		return runGqlProxy(gqlQuery);
	} catch (error) {
		return { error };
	}
};

const WalletTransactionDetailsPage = async props => {
	const { params, searchParams } = props;
	const walletId = params?.id;

	const page = parseInt(searchParams?.page ?? 0);

	const { data, error } = await getWalletTransactionsData(walletId, page);

	if (error) return <p>Error loading wallet transaction</p>;

	const { walletTransactions } = data;

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<form className={styles.form}>
					<WalletCardPage props={{ walletTransactions }} />
					<br />
					<div className="relative">
						<div className="absolute right-0">
							<button className={styles.button}>
								<Link
									href={`${WalletTransactionDetailsPage.routeName(walletId)}?page=${page + 1}`}
									replace={true}
								>
									Next Page
								</Link>
							</button>
						</div>
						<div className="absolute left-0">
							{page > 0 ? (
								<>
									<button className={styles.button}>
										<Link
											href={`${WalletTransactionDetailsPage.routeName(walletId)}?page=${page - 1}`}
											replace={true}
										>
											Previous Page
										</Link>
									</button>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
					<Link href={"/wallet-transaction"} replace={true} className="mb-5 mt-20 text-center">
						<button className={styles.button}>Add Wallet Transaction</button>
					</Link>
					<Link href={WalletDetailPage.routeName(walletId)} replace={true} className="text-center">
						<button className={styles.button}>Check Balance</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

WalletTransactionDetailsPage.routeName = (walletId: string) => `/wallet-transaction/${walletId}`;
export default WalletTransactionDetailsPage;
