import { PrismaClient } from "@prisma/client";


class Todo {
    private id: number;
    private body: string;
    private isDone: boolean;

    constructor(id: number, body: string, isDone: boolean) {
        this.body = body;
        this.id = id;
        this.isDone = isDone;
    }

    public getId(): number {
        return this.id;
    }

    public getBody(): string {
        return this.body;
    }

    public getIsDone(): boolean {
        return this.isDone;
    }

    public async updateBody(body: string, prismaClient: PrismaClient): Promise<void> {
        this.body = body;
        await prismaClient.todo.update({ data: { body: this.body }, where: { id: this.id }});
    }

    public async updateIsDone(isDone: boolean, prismaClient: PrismaClient): Promise<void> {
        this.isDone = isDone;
        await prismaClient.todo.update({ where: { id: this.getId()}, data: { isDone: this.getIsDone()}})
    }

    public async delete(prismaClient: PrismaClient): Promise<void> {
        await prismaClient.todo.delete({ where: { id: this.id }});
    }
}

export class TodoFinder {

    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    private async existById(id: number): Promise<boolean>{
        return await this.prismaClient.todo.count({ where: { id }}) > 0;
    }

    public async findTodoById(id: number): Promise<Todo>{
        if(!await this.existById(id)) throw Error('todo does not exist');
        const todo =  await this.prismaClient.todo.findUniqueOrThrow({ where: { id }});
        return new Todo(todo.id, todo.body, todo.isDone);
    }

    public async findAllTodos() {
        return await this.prismaClient.todo.findMany({ orderBy: { timeAdded: 'desc'}});
    }
}

export class TodoFactory {

    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    public async createNewTodo(body: string): Promise<Todo> {
        const todo = await this.prismaClient.todo.create({ data: { body }});
        return new Todo(todo.id, todo.body, todo.isDone);
    }
}

export const prismaClient = new PrismaClient();
export const todoFinder = new TodoFinder(prismaClient);
export const todoFactory = new TodoFactory(prismaClient);
