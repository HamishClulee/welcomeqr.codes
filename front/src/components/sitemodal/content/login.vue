<template>
    <div class="login-container">
        <div class="field-container">
            <label class="placey-text">NAME</label>
            <input type="text" class="form-control" placeholder="Name">
        </div>
        <div class="field-container">
            <label class="placey-text">URL</label>
            <input type="url" class="form-control" placeholder="URL">
        </div>

        <div class="modal-footer">
            <slot name="footer">
                <button type="submit" class="button">Cancel</button>
                <button type="submit" class="button">Submit</button>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login'
}
</script>

<style lang="sass" scoped>
.login-container
</style>