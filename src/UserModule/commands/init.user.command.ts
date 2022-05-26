import { Command, Positional } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../storage/repositories/user.repository'
import { UserEntity } from '../storage/entities/user.entity'
import { hashSync } from 'bcrypt'
import { SystemLoggerService } from '../../AppModule/services/system.logger.service'


@Injectable()
export class InitUserCommand {

    constructor (
        private readonly userRepository: UserRepository,
        private readonly systemLoggerService: SystemLoggerService,
    ) {
    }

    @Command({
        command: 'user:create:admin <name> <password>',
        describe: 'create a user',
    })
    async createAdmin (
        @Positional({ name: 'name' }) name: string,
        @Positional({ name: 'password' }) password: string
    ): Promise<void> {
        await this.generateUser(name, password, true)
    }

    private async generateUser (name: string, password: string, isAdmin: boolean): Promise<Boolean> {
        const existUser = await this.userRepository.findOne({ name: name })
        if (existUser) {
            this.systemLoggerService.log('This user was exists.')
            return
        }
        const user = new UserEntity()
        user.name = name
        user.password = hashSync(password, 10)
        user.isAdmin = isAdmin
        await this.userRepository.save(user)
        this.systemLoggerService.log(`User ${name} was created with password ${password}`)
    }

}
