"use client";
import Image from "next/image";
import { stringify } from "csv-stringify";

const WalletCardPage = ({ props }) => {
	const { walletTransactions } = props;

	const generateCsv = async () => {
		const csvData = await new Promise<string>((resolve, reject) => {
			stringify(walletTransactions, { header: true }, (err, output) => {
				if (err) {
					reject(err);
				} else {
					resolve(output);
				}
			});
		});

		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "walletTransactions.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<div className="flex items-center justify-between mb-4">
				<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
					Wallet Transaction Data
				</h5>
				{/* <a
					href="#"
					className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					View all
				</a> */}
				<button className="w-2/5" onClick={generateCsv}>
					Download CSV
				</button>
			</div>
			<div className="flow-root">
				<div id="dialog-window">
					<div id="scrollable-content">
						{!walletTransactions.length ? (
							<p
								style={{ height: "50vh" }}
								className="flex justify-center justify-items-center justify-self-center align-items-center text-red-600"
							>
								No Wallet Transaction data Found
							</p>
						) : (
							<>
								<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
									{walletTransactions.map(tx => (
										<li key={tx["Transaction_Id"]} className="py-3 sm:py-4">
											<div className="flex items-center space-x-4">
												<div className="flex-shrink-0 m-3">
													<Image
														className="w-8 h-8 rounded-full"
														src={`https://i.pravatar.cc/300?img=${1}`}
														// src={`https://i.pravatar.cc/300?u=${tx["Transaction_Id"]}`}
														alt={tx["Transaction_Id"]}
													/>
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
														{tx["Description"]}
													</p>
													<p
														className="text-sm text-gray-500 truncate dark:text-gray-400"
														title={tx["Transaction_Id"]}
													>
														{tx["Transaction_Id"]}
													</p>
												</div>
												<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white m-3">
													<p
														style={{ color: tx["Transaction_Type"] == "CREDIT" ? "green" : "red" }}
													>
														${tx["Wallet_Amount"]}
													</p>
												</div>
											</div>
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletCardPage;
