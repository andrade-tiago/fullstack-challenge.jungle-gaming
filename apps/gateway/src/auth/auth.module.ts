import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth-ms',
          port: 3001,
        },
      },
    ])
  ],
  providers: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
