import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AlertsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(AlertsService.name);

  async findByLocationAndType(location: string, type: string) {
    const API_URL =
      this.configService.get('alert.apiUrl') +
      '/alerts/' +
      location +
      '/' +
      type;
    this.logger.debug('Fetching alerts from ' + API_URL);

    const { data } = await firstValueFrom(
      this.httpService.get(API_URL).pipe(
        catchError((error) => {
          if (error?.response?.data.code === 404) {
            throw new NotFoundException(
              `No alerts found for location ${location} and type ${type}`,
            );
          }
          throw `An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`;
        }),
      ),
    );

    return {
      ...data,
      isActive: data.expires > new Date().toISOString(),
    };
  }
}
