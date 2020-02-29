import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AddressContoller } from './core/controllers/address.controller';

@Module({

  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  controllers: [
    AddressContoller
  ],
  providers: [
  ],
})

export class AppModule { }
