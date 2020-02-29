import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { AddressModel } from '../../models/address.model';


@Injectable()
export class AddressService {
  private readonly httpService: HttpService = new HttpService;


  constructor() {
    // to do ...
  }

  getAddress(postalCode: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.httpService.get(`https://viacep.com.br/ws/${postalCode}/json/`)
          .subscribe(
            result => {
              console.log(result);
              const address = result.data as AddressModel;
              address.ibge = parseFloat(result.data.ibge);
              resolve({ data: address, success: true, error: null });
            },
            err => {
              reject(new BadRequestException({ data: null, error: err.message, success: false }));
            }
          );
      } catch (error) {
        console.log(error);
        reject({ data: null, error: error.message, success: false });
      }
    });
  }
}