import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AlertsProducerService {
  constructor(@InjectQueue('alerts') private queue: Queue) {}

  async sendMessage(message: object) {
    await this.queue.add('alerts', message);
  }
}
