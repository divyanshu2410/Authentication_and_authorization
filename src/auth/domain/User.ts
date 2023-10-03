export default class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly password: string,
        public readonly type: string,
        public readonly email: string,
    ) { }
}