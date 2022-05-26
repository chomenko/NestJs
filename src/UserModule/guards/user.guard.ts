import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { UserRepository } from '../storage/repositories/user.repository'
import { compareSync } from 'bcrypt'
import { Utils } from '../../Utils/utils'
import { Reflector } from '@nestjs/core'


@Injectable()
export class UserGuard implements CanActivate {

    constructor (
        readonly reflector: Reflector,
        private readonly userRepository: UserRepository
    ) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const request = Utils.getRequest(context)
        const userName = request.headers['name']
        const password = request.headers['password']

        const mustHaveAdmin = this.reflector.get<any>('mustHaveAdmin', context.getHandler())

        if (!userName || !password) {
            return false
        }

        const user = await this.userRepository.findOne({
            where: {
                name: userName,
            },
        })

        if (!user) {
            return false
        }

        if (compareSync(password, user.password)) {
            if (Boolean(mustHaveAdmin) && !user.isAdmin) {
                throw new ForbiddenException('You are not an admin.')
            }
            request['user'] = user
            return true
        }

        return false
    }

}
