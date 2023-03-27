import { Module } from "@nestjs/common";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WalletModule } from "./api/wallet/wallet.module";

@Module({
	imports: [
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			autoSchemaFile: "schema.gql",
			subscription: true,
			graphiql: true,
			cache: false,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			// load: [configForRoot],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const uri = configService.get<string>("MONGODB_URI");
				// Logger.debug(uri);
				return {
					uri,
				};
			},
			inject: [ConfigService],
		}),
		WalletModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
