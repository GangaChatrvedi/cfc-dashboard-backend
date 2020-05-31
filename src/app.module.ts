import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  KeycloakModule,
  ResourceGuard,
  AuthGuard,
} from './keycloak/keycloak.module';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    KeycloakModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'master',
      clientId: 'google-client',
      secret: 'e5d608e0-ac33-4d4a-9c24-6c94d9db4458',
      cookieKey: 'KEYCLOAK_JWT'
    })
  ],
  controllers: [AppController],
  providers: [
    // These are in order, see https://docs.nestjs.com/guards#binding-guards
    // for more information

    AppService,
    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    }
  ],
})
export class AppModule {}


