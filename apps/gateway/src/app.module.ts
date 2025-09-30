import { Module } from "@nestjs/common";
import { AppConfigModule } from "./config/config.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
