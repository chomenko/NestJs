import { Injectable } from '@nestjs/common'
import { AmqpConnectionManager } from '@golevelup/nestjs-rabbitmq'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq/lib/amqp/connection'


@Injectable()
export class MqService {

    static MQ_NAME = 'userQueue'
    static EXCHANGE = 'userModule'

    constructor (
        private readonly manager: AmqpConnectionManager,
    ) {
    }

    get conn (): AmqpConnection {
        return this.manager.getConnection(MqService.MQ_NAME)
    }

    async publish (message: any): Promise<void> {
        await this.conn.publish(MqService.EXCHANGE, 'queue', {
            message,
        })
    }

}
