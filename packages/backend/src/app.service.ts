import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHealth(): string {
		return "You reached alternate dimension universe";
	}
}
