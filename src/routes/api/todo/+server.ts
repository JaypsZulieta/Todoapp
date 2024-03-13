import { prismaClient, todoFinder } from "$lib";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";


export const PUT = async (event: RequestEvent) => {
    const id = event.url.searchParams.get('id');
    const todo = await todoFinder.findTodoById(Number(id));
    await todo.updateIsDone(!todo.getIsDone(), prismaClient);
    return json({ message: 'success '});
}