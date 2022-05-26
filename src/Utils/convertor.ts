import { classToClassFromExist, deserialize, plainToClass, serialize } from 'class-transformer'
import { Type } from '@nestjs/common/interfaces/type.interface'
import { ClassTransformOptions } from 'class-transformer/types/interfaces'


export class Convertor {

    static async convert<T> (constructor: Type<T>, fromObject: any, options?: ClassTransformOptions): Promise<T> {
        if (fromObject instanceof Promise) {
            fromObject = await fromObject
        }
        const object = new constructor()
        return classToClassFromExist<T>(fromObject, object, {
            enableCircularCheck: true,
            strategy: 'exposeAll',
            ...options,
        })
    }

    static async response<T> (constructor: Type<T>, fromObject: any, options?: ClassTransformOptions): Promise<T> {
        if (fromObject instanceof Promise) {
            fromObject = await fromObject
        }
        const raw = serialize(fromObject, {
            enableCircularCheck: true,
            strategy: 'exposeAll',
        })
        return deserialize<T>(constructor, raw, {
            enableCircularCheck: true,
            strategy: 'exposeAll',
            excludeExtraneousValues: true,
            ...options,
        })
    }

}
