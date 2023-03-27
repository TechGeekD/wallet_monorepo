"use client";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@utils/index";

const WalletLogoutPage = () => {
	const router = useRouter();
	const [, setWalletId] = useLocalStorage("walletId", "");

	const logout = async () => {
		setWalletId("");
		router.replace("/");
	};

	return (
		<div
			style={{ width: "50vw" }}
			className="align-items-center flex justify-center justify-items-center justify-self-center mt-5"
		>
			<button className="w-2/5" onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default WalletLogoutPage;
