<script lang="ts">
    import { flip } from "svelte/animate";
    import { fade, fly } from "svelte/transition";
    import Todo from "./Todo.svelte";
    export let todos: { id: number, body: string, isDone: boolean, itemNo: number }[];
</script>

<div class="overflow-x-hidden shadow-2xl h-96">
    <table class="table">
        <thead class=" bg-green-400 text-secondary-content">
            <tr>
                <th class=" text-right"></th>
                <th class="w-96">tasks to do</th>
                <th class="text-center">task complete</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each todos as todo (todo.id)}
                <tr class="hover" animate:flip={{delay: 200, duration: 200}} in:fade={{delay: 200, duration:200}} out:fly={{x:1000}}>
                    <Todo {todo} />
                </tr>
            {/each}
        </tbody>
    </table>
</div>