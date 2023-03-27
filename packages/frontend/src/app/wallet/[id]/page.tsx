import Link from "next/link";
import styles from "@styles/wallet.module.css";
import WalletLogoutPage from "./[logout]";

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
		console.log("/// getWalletData ///");
		return res.json();
	} catch (error) {
		console.log("### getWalletData ###");
		console.log(error);
		return { error };
	}
};

const WalletDetailPage = async ({ params }) => {
	const walletId = params.id ?? "";
	const data = await getWalletData(walletId);
	console.log("getWalletData getWalletData getWalletData");
	console.log(walletId);
	console.log(data);
	const {
		data: {
			wallet: { name, balance },
		},
	} = data;

	// const [userName, setUserName] = useState("");
	// const [balance, setBalance] = useState(0);
	// const router = useRouter();
	// const [isLoading, setLoading] = useState(true);

	// useEffect(() => {
	// 	setLoading(true);
	// 	getWalletData(walletId).then(({ data, error }) => {
	// 		setLoading(false);
	// 		if (error) {
	// 			return console.log(error);
	// 		}
	// 		if (data?.wallet) {
	// 			setUserName(data.wallet.name);
	// 			setBalance(data.wallet.balance);
	// 		}
	// 	});
	// }, []);

	// if (isLoading) return <p>Loading...</p>;
	if (!name) return <p>No Wallet data</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles["form-wrapper"]}>
				<h1 className={styles.h1}>{name}&apos;s Wallet Balance</h1>
				<form className={styles.form}>
					<label className={styles.label} htmlFor="balance">
						<p className={styles.p}>{balance}</p>
					</label>
					<button className={styles.button}>
						<Link href={`/wallet-transaction/${walletId}`}>See Wallet Transactions</Link>
					</button>
					<WalletLogoutPage />
				</form>
			</div>
		</div>
	);
};

export default WalletDetailPage;
