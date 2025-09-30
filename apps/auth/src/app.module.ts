import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import dataSource from '../data-source';
import { AppConfigModule } from "./config/config.module";

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    TypeOrmModule.forRoot({ ...dataSource.options, autoLoadEntities: true }),
    UsersModule,
    CommonModule,
  ],
})
export class AppModule {}
