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
            <button class="btn btn-primary" @click="editUser(user)">Edit</button>
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
    createForm() {
      this.$router.push({ name: 'editorUserCreate', params: { id: this.$route.params.id ?? '' } });
    },
    editUser(user) {
      this.$router.push({ name: 'editorUserEdit', params: { userId: user.id } });
    },
  },
};
</script>

<style scoped></style>