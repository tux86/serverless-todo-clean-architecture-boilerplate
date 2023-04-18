export class Todo {
    constructor(
        public id: string,
        public userId: string,
        public title: string,
        public completed: boolean
    ) {}
}