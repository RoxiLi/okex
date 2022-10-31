import { Injectable } from '@nestjs/common';
import {AuthenticationService} from "src/utils/authentication/authentication.service";

@Injectable()
export class AppService {
  constructor(private readonly auth: AuthenticationService) {}

   getHello(): string {
    let resp: any
     resp=this.auth.getAuthentication()
    return resp;
  }
}
