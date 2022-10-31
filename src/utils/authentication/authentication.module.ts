import {HttpModule} from "@nestjs/axios";
import {Global, Module} from "@nestjs/common";
import {AuthenticationService} from "src/utils/authentication/authentication.service";

@Global()
@Module({
  imports: [HttpModule],
  exports: [AuthenticationService],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}