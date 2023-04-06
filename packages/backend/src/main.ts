import { LogLevel } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import morgan from "morgan";

import { AppModule } from "./app.module";

async function bootstrap() {
	const isProd = process.env?.NODE_ENV?.toLowerCase() == "production";
	const prodLevel: LogLevel[] = ["log", "error", "warn"];
	const debugLevel: LogLevel[] = ["debug", "verbose", ...prodLevel];

	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		logger: isProd ? prodLevel : debugLevel,
	});

	const timeZone = "Asia/Kolkata";
	morgan.token("date", (req, res, tz) => {
		const timeZoneDate = new Date().toLocaleString("en-US", { timeZone: tz });
		return new Date(timeZoneDate).toISOString();
	});
	morgan.format(
		"timeZoneFormat",
		`[:date[${timeZone}]] :remote-addr :remote-user ":method :url" :status :res[content-length] - :response-time ms`,
	);
	app.use(morgan("timeZoneFormat"));

	// const configService = app.get(ConfigService);
	app.enableCors();
	await app.listen(process.env?.BACKEND_PORT ?? 3000, "0.0.0.0");
}
bootstrap();
