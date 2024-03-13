<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import EditModal from "./EditModal.svelte";
    export let todo: { id: number, body: string, isDone: boolean, itemNo: number };

    const update = async (e: Event) => {
        const checkBox = e.target as HTMLInputElement;
        await fetch(`/api/todo/?id=${checkBox.value as string}`, { method: 'PUT' }).then(async (data) => await data.json());
    }
</script>


<th class="text-right">
    {#key todo.itemNo}
        <span in:fade={{delay:200,duration:200}} out:fade={{duration:200}}>
            {todo.itemNo}.
        </span>
    {/key}
</th>
<td>
   {todo.body}
</td>
<td>
    <div class="grid place-items-center" >
        <input class="checkbox checkbox-success rounded-box" checked={todo.isDone} type="checkbox" name="id" value={todo.id} on:change={update}>
    </div>
</td>
<td>
    <div class="flex place-content-center gap-2">
        <div>
            <EditModal todoId={todo.id} todoBody={todo.body} />
        </div>
        <form action="?/delete" method="POST" use:enhance>
            <button class="btn btn-sm btn-square hover:bg-error hover:text-error-content  btn-ghost" type="submit" name="id" value={todo.id}>
                <span class="material-symbols-outlined">delete</span>
            </button>
        </form> 
    </div> 
</td>