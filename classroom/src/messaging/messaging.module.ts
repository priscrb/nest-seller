import { Module } from '@nestjs/common';
import { PurchaseController } from './controllers/purchases.controller';

/**
 * controller to receive message from kafka
 */
@Module({
  controllers: [PurchaseController],
})
export class MessagingModule {}
