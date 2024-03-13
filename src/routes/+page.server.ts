import type { PageServerLoad } from "./$types";
import {prismaClient, todoFactory, todoFinder } from "$lib";
import type { Actions } from "@sveltejs/kit";

export const load = (async () => {
    const todos = (await todoFinder.findAllTodos()).map((todo, index) => {
        return { id: todo.id, body: todo.body, isDone: todo.isDone, itemNo: index + 1}
    });
    return { todos }
}) satisfies PageServerLoad;

export const actions = ({
    add: async (event) => {
        const formData = await event.request.formData();
        const body = formData.get('body') as string;
        await todoFactory.createNewTodo(body);
    },
    delete: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');
        const todo = await todoFinder.findTodoById(Number(id));
        await todo.delete(prismaClient);
    },
    update: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');
        const body = formData.get('body') as string;
        const todo = await todoFinder.findTodoById(Number(id));
        await todo.updateBody(body, prismaClient);
    }
}) satisfies Actions;