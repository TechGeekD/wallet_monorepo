"use client";
import { useLocalStorage } from "@utils/index";
import Link from "next/link";

import Home from "@/app/page";

const WalletLogoutPage = () => {
	const [, setWalletId] = useLocalStorage("walletId", "");

	const logout = async () => {
		setWalletId("");
	};

	return (
		<div
			style={{ width: "50vw" }}
			className="align-items-center flex justify-center justify-items-center justify-self-center mt-5"
		>
			<Link href={Home.routeName()} onClick={logout} className="w-2/5 text-center">
				<button>Logout</button>
			</Link>
		</div>
	);
};

export default WalletLogoutPage;
