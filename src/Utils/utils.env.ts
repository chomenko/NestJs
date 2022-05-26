export class UtilsEnv {
    static DEVELOPMENT = 'development'
    static PRODUCTION = 'production'
    static TESTING = 'testing'

    static get IS_DEVELOPMENT (): boolean {
        return UtilsEnv.isEnvironment(UtilsEnv.DEVELOPMENT)
    }

    static get IS_PRODUCTION (): boolean {
        return UtilsEnv.isEnvironment(UtilsEnv.PRODUCTION)
    }

    static get IS_TESTING (): boolean {
        return UtilsEnv.isEnvironment(UtilsEnv.TESTING)
    }

    static isEnvironment (environment: string): boolean {
        return process.env.ENVIRONMENT === environment
    }

    static setMocha = (mocha = true): void => {
        global.isMochaTest = mocha
    }

    static get isMocha (): boolean {
        if (global.isMochaTest) {
            return true
        } else {
            return false
        }
    }

    static isNotMochaThrow (e: Error = new Error('Is mocha test!'), killProcess = true): void {
        if (UtilsEnv.isMocha) {
            return
        }
        if (killProcess) {
            throw e
        }
    }

    static isMochaThrow (e: Error = new Error('Is mocha test!'), killProcess = true): void {
        if (!UtilsEnv.isMocha) {
            return
        }
        if (killProcess) {
            throw e
        }
    }

    static get isCommand (): boolean {
        return process.env['COMMAND'] === 'true'
    }
}
