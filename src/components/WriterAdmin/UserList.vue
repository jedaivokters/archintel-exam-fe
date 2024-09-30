<template>
  <div class="container">
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
            <button class="btn btn-primary" @click="loginAs(user)">Go to Dashboard</button>
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
      users: [
        { id: 1, firstname: 'John', lastname: 'Doe', type: 'Writer', status: 'Active' },
        { id: 2, firstname: 'Jane', lastname: 'Smith', type: 'Editor', status: 'Inactive' },
        // Add more user data here
      ],
    };
  },
  methods: {
    loginAs(user) {
      // Implement login as functionality
      console.log(`Logging in as ${user.firstname} ${user.lastname}`);
    },
  },
};
</script>

<style scoped>
</style>