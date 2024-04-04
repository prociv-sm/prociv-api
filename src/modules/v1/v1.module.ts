import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { SquadsModule } from './squads/squads.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AlertsModule } from './alerts/alerts.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/users', module: UsersModule },
      { path: '/alerts', module: AlertsModule },
      { path: '/auth', module: AuthModule },
      { path: '/activities', module: ActivitiesModule },
      { path: '/squads', module: SquadsModule },
      { path: '/vehicles', module: VehiclesModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    UsersModule,
    AuthModule,
    ActivitiesModule,
    SquadsModule,
    VehiclesModule,
    AlertsModule,
  ],
})
export default class V1Module {}
