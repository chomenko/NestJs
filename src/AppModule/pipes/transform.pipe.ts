import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'


export class TransformPipe implements PipeTransform<any> {

    async transform (value: any, { metatype, type }: ArgumentMetadata): Promise<any> {
        if ((type === 'query' || type === 'body') && typeof metatype === 'function') {

            let name
            try {
                name = metatype.name
            } catch (e) {
                return value
            }
            const exclude = [
                'Object',
                'Array',
                'Function',
                'Boolean',
                'Symbol',
                'Error',
                'Number',
                'String',
                'RegExp',
                'Math',
                'Set',
            ]
            if (exclude.includes(name)) {
                return value
            }
            value = typeof value === 'undefined' ? {} : JSON.parse(JSON.stringify(value))

            const object = plainToClass(metatype, value, {
                strategy: 'exposeAll',
            })

            const results = await validate(object)

            if (results instanceof ValidationError
                || (Array.isArray(results) && results[0] instanceof ValidationError)) {
                const errors = []
                if (Array.isArray(results)) {
                    for (const result of results) {
                        const err: ValidationError = result
                        const messages = []
                        for (const key in err.constraints) {
                            const constraint = err.constraints[key]
                            messages.push(constraint)
                        }
                        errors.push({
                            property: err.property,
                            messages,
                        })
                    }
                }
                throw new BadRequestException({
                    code: 400,
                    message: 'Bad Request',
                    ValidationError: errors,
                })
            }
            return object
        }
        return value
    }
}
