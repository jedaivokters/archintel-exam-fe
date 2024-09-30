<template>
  <div class="container">
    <button class="btn btn-primary" @click="createForm">Create Company</button>
    <h2 class="my-4">Company List</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Logo</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>{{ company.name }}</td>
          <td>{{ company.logo }}</td>
          <td>{{ company.status }}</td>
          <td>
            <button class="btn btn-primary" @click="editCompany(company)">Edit</button>
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
      companies: [],
    };
  },
  async mounted() {
    const res = await this.$api.get('companies');

    if (res.status === 200) {
      this.companies = res.data;
    } else {
      alert('Failed to fetch companies');
    }
  },
  methods: {
    createForm() {
      this.$router.push({ name: 'editorCompanyCreate', params: { id: this.$route.params.id ?? '' } });
    },
    editCompany(company) {
      this.$router.push({ name: 'editorCompanyEdit', params: { companyId: company.id } });
    },
  },
};
</script>

<style scoped></style>