import { BadRequestException, ExecutionContext } from '@nestjs/common'
import { IncomingMessage } from 'http'
import { GqlExecutionContext } from '@nestjs/graphql'


export class Utils {

    static getRequest (context: ExecutionContext): IncomingMessage {
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req
        if (req) {
            return req
        }
        for (const arg of context.getArgs()) {
            if (arg instanceof IncomingMessage) {
                return arg
            }
        }
        throw new BadRequestException()
    }

}
