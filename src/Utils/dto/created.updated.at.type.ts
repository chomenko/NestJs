import { Field, ObjectType } from '@nestjs/graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { Expose } from 'class-transformer'


@ObjectType()
export abstract class CreatedUpdatedAtType {

    @Field(() => Number)
    id: number

    @Expose()
    @Field(() => DateTimeResolver)
    createdAt: Date

    @Expose()
    @Field(() => DateTimeResolver)
    updatedAt: Date

}
