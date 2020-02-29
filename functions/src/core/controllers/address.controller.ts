import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AddressService } from '../services/actions/address.service';

@Controller('zipcode')
export class AddressContoller {
  readonly testService: AddressService = new AddressService();

  constructor() {
    // to do...
  }

  //api/zipcode/60541658
  @Get('/:zipcode')
  @HttpCode(200)
  async getAddress(
    @Param('zipcode') zipcode: string
  ) {
    return await this.testService.getAddress(zipcode);
  }
}