import { InputType, Field, PartialType } from "@nestjs/graphql";

import { Wallet } from "../schemas";

@InputType()
export class UpdateWalletInput extends PartialType(Wallet, InputType) {
	@Field({ description: "Wallet id field" })
	id: string;
}
