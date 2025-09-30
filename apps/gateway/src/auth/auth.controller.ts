import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthClient } from "../constants/clients";
import { firstValueFrom } from "rxjs";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private _usersClient: ClientProxy
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    Logger.log(body);
    try {
      const authRegisterReturn = this._usersClient.send('auth.register', body);

      Logger.log(authRegisterReturn, 'Observable');

      const value = await firstValueFrom(authRegisterReturn);

      Logger.log(value, 'Value');

      return value;
    } catch (e) {
      Logger.error(e);
    }
  }
}
