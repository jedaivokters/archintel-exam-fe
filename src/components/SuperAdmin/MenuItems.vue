<template>
    <ul class="menu">
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
    </ul>
</template>

<script>

export default {
    name: 'AdminMenuItems',
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