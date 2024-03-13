<script lang="ts">
    import AddTodoForm from '$lib/components/AddTodoForm.svelte';
    import Table from '$lib/components/Table.svelte';
    export let data;
</script>

<svelte:head>
    <title>Todo</title>
</svelte:head>


<div class="px-64 mt-5">
    <AddTodoForm />
    <div class="mt-10">
        <Table todos={data.todos} />
    </div>
</div>
