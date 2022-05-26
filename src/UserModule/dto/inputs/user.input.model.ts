import { Field, InputType } from '@nestjs/graphql'
import { CreatedUpdatedAtType } from '../../../Utils/dto/created.updated.at.type'


@InputType()
export class UserTypeModel extends CreatedUpdatedAtType {

    @Field(() => Number)
    id: number

    @Field(() => String)
    name: string

    @Field(() => Boolean)
    isAdmin: boolean

}
