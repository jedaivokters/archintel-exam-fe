<template>
  <div class="container">
    <button class="btn btn-primary" @click="createForm">Create User</button>
    <h2 class="my-4">User List</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.type }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button v-if="checkAccess(user)" class="btn btn-primary" @click="loginAs(user)">Go to Dashboard</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardPage: '',
      users: [],
    };
  },
  async mounted() {
    const res = await this.$api.get('users');

    if (res.status === 200) {
      this.users = res.data;
    } else {
      alert('Failed to fetch users');
    }
  },
  methods: {
    loginAs(user) {
      const type = user.type;
      let dashboardPage = '';

      switch (type) {
        case 'Writer':
          dashboardPage = 'writer';
          break;
        case 'Editor':
          dashboardPage = 'editor';
          break;
        default:
          dashboardPage = 'superadmin';
          break;
      }

      this.dashboardPage = dashboardPage;
      console.log(dashboardPage)
      this.$router.push({ name: dashboardPage, params: { id: user.id } });
    },
    createForm() {
      this.$router.push({ name: 'userCreate' });
    },
    checkAccess(user) {
      return user.status == 'Active';
    },
  },
};
</script>

<style scoped></style>