import { createParamDecorator } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { Utils } from '../../Utils/utils'


export const CurrentUser = createParamDecorator(
    (data, host: ExecutionContextHost) => {
        const request = Utils.getRequest(host)
        return request['user']
    },
)
