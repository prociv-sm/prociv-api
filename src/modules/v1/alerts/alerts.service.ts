import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AlertDto } from './dto/alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findByLocationAndType(
    location: string,
    type: string,
  ): Promise<Observable<AxiosResponse<AlertDto[]>>> {
    return this.httpService.get(
      this.configService.get('ALERT_API_URL', 'http://localhost:8085/api/v1') +
        '/alerts/' +
        location +
        '/' +
        type,
    );
  }
}
