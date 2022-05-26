import { SetMetadata } from '@nestjs/common'


export const MustHaveAdmin = (): MethodDecorator => {
    return SetMetadata('mustHaveAdmin', true)
}
