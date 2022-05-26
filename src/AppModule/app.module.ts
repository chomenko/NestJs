import { Global, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CommandModule } from 'nestjs-command'
import { UserModule } from '../UserModule/user.module'
import { SystemLoggerService } from './services/system.logger.service'
import { EshopModule } from '../EshopModule/eshop.module'


@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(config.orm),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: './schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        HttpModule,
        CommandModule,
        EshopModule,
        UserModule,
    ],
    controllers: [],
    providers: [
        SystemLoggerService,
    ],
    exports: [
        TypeOrmModule,
        CommandModule,
        SystemLoggerService,
    ],
})
export class AppModule {
}
