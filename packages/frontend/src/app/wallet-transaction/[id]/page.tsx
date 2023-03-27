import Link from "next/link";
import styles from "@styles/wallet-transactions.module.css";
import WalletCardPage from "./[card]";

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

const getWalletTransactionsData = async (walletId: string, page: number = 0, limit: number = 5) => {
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
				}
			  }`,
			variables: { walletId, page, limit },
		};

		return runGqlProxy(gqlQuery);
	} catch (error) {
		return { error };
	}
};

const WalletTransactionsPage = async props => {
	const { params, searchParams } = props;
	const walletId = params.id;
	const page = parseInt(searchParams?.page ?? 0);
	console.log(props);
	console.log(page);
	const {
		data: { walletTransactions },
	} = await getWalletTransactionsData(walletId, page);
	// console.log(JSON.stringify(walletTransactions));
	// const [walletTransactions, setWalletTransactionData] = useState([]);
	// const [isLoading, setLoading] = useState(true);

	// useEffect(() => {
	// 	setLoading(true);
	// 	getWalletTransactionsData(walletId).then(({ data, error }) => {
	// 		setLoading(false);
	// 		if (error) {
	// 			return console.log(error);
	// 		}
	// 		if (data?.walletTransactions) {
	// 			setWalletTransactionData(data.walletTransactions);
	// 		}
	// 	});
	// }, []);

	// if (isLoading) return <p>Loading...</p>;
	// if (!walletTransactions.length) return <p>No Wallet Transaction data</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<form className={styles.form}>
					<WalletCardPage props={{ walletTransactions }} />
					<br />
					<div className="relative">
						<div className="absolute right-0">
							<button className={styles.button}>
								<Link href={`/wallet-transaction/${walletId}?page=${page + 1}`} replace={true}>
									Next Page
								</Link>
							</button>
						</div>
						<div className="absolute left-0">
							{page > 0 ? (
								<>
									<button className={styles.button}>
										<Link href={`/wallet-transaction/${walletId}?page=${page - 1}`} replace={true}>
											Previous Page
										</Link>
									</button>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
					<button className="mb-5 mt-20">
						<Link href="/wallet-transaction" replace={true}>
							Add Wallet Transaction
						</Link>
					</button>
					<button className={styles.button}>
						<Link href={`/wallet/${walletId}`} replace={true}>
							Check Balance
						</Link>
					</button>
				</form>
			</div>
		</div>
	);
};

export default WalletTransactionsPage;
