import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Wallet {
	@Field(() => String, { description: "name field" })
	name: string;
}
