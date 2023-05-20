export class ApiError extends Error {
    constructor(public httpError: number, public message: string) {
        super()
    }
}