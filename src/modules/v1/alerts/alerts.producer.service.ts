import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AlertsProducerService {
  constructor(@InjectQueue('alerts-queue') private queue: Queue) {}

  async sendMessage(message: object) {
    await this.queue.add('alerts-job', message);
  }
}
