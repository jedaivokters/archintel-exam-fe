<template>
    <ul class="menu">
        <li><router-link :to="{ name: 'editor', params: {id : user} }">Dashboard</router-link></li>
        <li><router-link :to="{ name: 'editorAllMedia', params: {id : user} }">All Media</router-link></li>
        <hr class="bg-white" />
        <li class="mt-2"><router-link :to="{ name: 'editorManageUsers', params: {id : user} }">Manage Users</router-link></li>
        <li><router-link :to="{ name: 'editorManageCompanies', params: {id : user} }">Manage Companies</router-link></li>
    </ul>
</template>

<script>

export default {
    name: 'EditorMenuItems',
    data() {
        return {
            user: this.$route.params.id ?? ''
        }
    },
    mounted() {

    }
};
</script>


<style>
.menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu li {
    display: block;
}

.menu li a {
    text-decoration: none;
    color: #fff;
    /* Change to your desired text color */
    font-size: 18px;
    font-weight: 400;
    padding: 15px;
    transition: color 0.3s ease-in-out;
}

.menu li:hover,
.menu li:focus {
    color: #ff6b00;
    /* Change to your desired hover color */
    background-color: #333;
}
</style>