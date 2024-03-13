<script>

    import { enhance } from "$app/forms";

</script>
<form class="flex gap-1" method="POST" action="?/add" use:enhance>
    <input class="input input-bordered input-primary input-sm w-64" type="text" name="body" required />
    <button class="btn  bg-blue-400 btn-sm" type="submit">
        <span class="material-symbols-outlined">add</span>
    </button>
</form> 