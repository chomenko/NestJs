import { Module } from '@nestjs/common'
import { LoadResources } from '../Utils/load.resources'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InitUserCommand } from './commands/init.user.command'
import { UserRepository } from './storage/repositories/user.repository'
import { UserEntity } from './storage/entities/user.entity'
import { UserGuard } from './guards/user.guard'
import { UserResolver } from './resolvers/user.resolver'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { config } from '../config'
import { MqService } from './rabbit/mq.service'
import { MqSubscriber } from './rabbit/mq.subscriber'


@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserRepository,
        ]),
        RabbitMQModule.forRoot(RabbitMQModule, {
            name: MqService.MQ_NAME,
            exchanges: [
                {
                    name: MqService.EXCHANGE,
                    type: 'topic',
                },
            ],
            uri: `amqp://${config.rabbit.user}:${config.rabbit.pass}@${config.rabbit.host}:${config.rabbit.port}`,
            prefetchCount: 1,
        }),
    ],
    controllers: [
        ...LoadResources.load(__dirname, ['controller']),
    ],
    providers: [
        UserResolver,
        InitUserCommand,
        UserGuard,
        MqService,
        MqSubscriber,
    ],
    exports: [],

})
export class UserModule {
}
