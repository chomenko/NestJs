import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { MqService } from './mq.service'


@Injectable()
export class MqSubscriber implements OnApplicationBootstrap, OnApplicationShutdown {

    constructor (
        private readonly mqService: MqService,
    ) {
    }

    async onApplicationBootstrap (): Promise<any> {
        await this.mqService.conn.createRpc(async (msg) => {
            await this.amqpHandler(msg)
        }, {
            exchange: MqService.EXCHANGE, routingKey: 'queue',
        })
    }

    async onApplicationShutdown (): Promise<void> {
        await this.mqService.conn.managedConnection.close()
    }

    async amqpHandler (msg: any): Promise<void> {
        console.log('------>amqpHandler')
        console.log(msg)
        return Promise.resolve()
    }

}
