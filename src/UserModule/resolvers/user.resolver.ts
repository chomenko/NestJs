import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../decorators/current.user.decorator'
import { UserEntity } from '../storage/entities/user.entity'
import { BadRequestException, NotFoundException, UseGuards } from '@nestjs/common'
import { UserGuard } from '../guards/user.guard'
import { hashSync } from 'bcrypt'
import { UserRepository } from '../storage/repositories/user.repository'
import { SystemLoggerService } from '../../AppModule/services/system.logger.service'
import { MustHaveAdmin } from '../decorators/must.have.admin.decorator'
import { UserTypeModel } from '../dto/outupts/user.type.model'
import { MqService } from '../rabbit/mq.service'


@Resolver()
export class UserResolver {

    constructor (
        private readonly userRepository: UserRepository,
        private readonly systemLoggerService: SystemLoggerService,
        private readonly mqService: MqService,
    ) {
    }

    @Mutation(() => UserTypeModel)
    async registerUser (
        @Args('name') name: string,
        @Args('password') password: string
    ): Promise<UserTypeModel> {
        const existUser = await this.userRepository.findOne({ name: name })
        if (existUser) {
            throw new BadRequestException('This user was exists.')
        }
        const userEntity = new UserEntity()
        userEntity.name = name
        userEntity.password = hashSync(password, 10)
        userEntity.isAdmin = false

        await this.userRepository.save(userEntity)

        await this.mqService.publish(userEntity)

        this.systemLoggerService.log(`New user '${userEntity.name}' was created.`, 'UserResolver')
        return Promise.resolve(userEntity)
    }

    @UseGuards(UserGuard)
    @Query(() => UserTypeModel)
    usersWhoAmI (
        @CurrentUser() user: UserEntity
    ): UserTypeModel {
        return user
    }

    @MustHaveAdmin()
    @UseGuards(UserGuard)
    @Mutation(() => String)
    async usersRemoveUser (
        @Args('userId') userId: number
    ): Promise<string> {
        const user = await this.userRepository.findOne(userId)
        if (!user) {
            throw new NotFoundException(`User ${userId} was not found.`)
        }
        await this.userRepository.remove(user)
        return `User ${userId} was removed.`
    }

    @MustHaveAdmin()
    @UseGuards(UserGuard)
    @Query(() => [UserTypeModel])
    async userGetUsers (
    ): Promise<Array<UserTypeModel>> {
        const users = await this.userRepository.find()
        const userResponse: UserTypeModel[] = []
        for (const user of users) {
            userResponse.push(await UserTypeModel.createFromEntity(user))
        }
        return userResponse
    }
}
