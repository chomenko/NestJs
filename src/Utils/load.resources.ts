import * as glob from 'glob'


export class LoadResources {

    static readonly types: Array<string> = ['service', 'guard', 'command', 'resolver', 'mq.subscriber']

    static load (path: string, types: string[] = LoadResources.types): any[] {
        const providers = []
        const paths = glob.sync(`${path}/**/*.+(${types.join('|')}).js`)
        for (const path of paths) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const file = require(path)
            const provider = file[Object.keys(file)[0]]
            providers.push(provider)
        }
        return providers
    }
}
