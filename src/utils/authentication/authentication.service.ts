import {HttpException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, map, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import * as crypto from 'crypto';
const CryptoJS = require("crypto-js");


@Injectable()
export class AuthenticationService {
  constructor(private readonly httpService: HttpService) {}
   getAuthentication(): Observable<AxiosResponse<any>> {
     const ep = '/api/v5/asset/convert/currencies'
    const timestamp = this.getTimeUtc()
    const signature = this.getSing(timestamp,'GET',
                      ep,'', process.env["OK-ACCESS-KEY"])
    const response =  this.httpService.get(
      'https://www.okx.com/api/v5/asset/convert/currencies',
      {
      headers :{
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY':process.env["OK-ACCESS-KEY"],
        'OK-ACCESS-SIGN':signature,
        'OK-ACCESS-PASSPHRASE':process.env["OK-ACCESS-PASSPHRASE"],
        'OK-ACCESS-TIMESTAMP': timestamp,
      },
    }).pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
      map(response => response.data)
    )

    return response;
  }
  getTimeUtc(){
    const date = new Date();
    return  date.toISOString();
  }
  getSing(timestamp : string, methodHttps : string,
          endPoint:string, requestBody: string, secretKey:string){
    // Create prehash string
    const preHash : string = timestamp + methodHttps + endPoint
      + (requestBody ? JSON.stringify(requestBody) : '')

    // 2: whithout prepared the secret Key
    // Sign the prehash string with the SecretKey using the HMAC SHA256.
    let singWithoutSecretKey = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(preHash, secretKey))
    console.log(singWithoutSecretKey.toString())

    // 3: whit import crypto
    const hmac = crypto.createHmac('sha256',secretKey)
    const signature = hmac.update(preHash).digest('base64');
    console.log(signature)


    return signature.toString()
  }
}