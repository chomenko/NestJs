import { Field, ObjectType } from '@nestjs/graphql'
import { Convertor } from '../../../Utils/convertor'
import { CreatedUpdatedAtType } from '../../../Utils/dto/created.updated.at.type'
import { UserEntity } from '../../storage/entities/user.entity'


@ObjectType()
export class UserTypeModel extends CreatedUpdatedAtType {

    @Field(() => Number)
    id: number

    @Field(() => String)
    name: string

    @Field(() => Boolean)
    isAdmin: boolean

    static async createFromEntity (user: UserEntity): Promise<UserTypeModel> {
        return Convertor.convert(UserTypeModel, user)
    }

}
