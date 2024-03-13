<script lang="ts">
    import { enhance } from "$app/forms";



    export let todoId: number;
    export let todoBody: string;

    let modal: HTMLDialogElement;

    const showModal = () => {
        modal.showModal();
    }

    const closeModal = () => {
        modal.close();
    }

</script>

<button class="btn btn-sm btn-square hover:bg-info hover:text-info-content  btn-ghost"  on:click={showModal}>
    <span class="material-symbols-outlined">edit</span>
</button>
<dialog bind:this={modal}  class="modal">
    <div class="modal-box p-0">
        <form action="?/update" method="POST" use:enhance>
            <table class="table">
                <thead class=" bg-blue-400 text-secondary-content">
                    <tr>
                        <th class="w-96">Edit todo</th>
                        <th class="text-center w-16"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input class="input input-primary input-sm w-full" type="text" name="body" value={todoBody}>
                        </td>
                        <td class="flex gap-1">
                            <button class="btn btn-info btn-sm w-16" name="id" value={todoId} on:click={closeModal}>
                                <span class="material-symbols-outlined">
                                    save
                                </span>
                            </button>
                            <form method="dialog">
                                <button class="btn btn-error btn-sm w-16">
                                    <span class="material-symbols-outlined">
                                        cancel
                                    </span>
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</dialog>