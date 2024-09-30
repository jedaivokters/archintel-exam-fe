<template>
    <div class="container mt-5">
        <h2>{{ isEditing ? 'Edit Company' : 'Create Company' }}</h2>

        <!-- Success and Error Messages -->
        <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="form.name" required />
            </div>

            <div class="mb-3">
                <label for="logo" class="form-label">Logo</label>
                <input type="text" class="form-control" id="logo" v-model="form.logo" required />
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select class="form-select" id="status" v-model="form.status" required>
                    <option value="" disabled>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ isEditing ? 'Update Company' : 'Create Company' }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            company: {
                id: '',
            },
            form: {
                name: this.company?.name || '',
                logo: this.company?.logo || '',
                status: this.company?.status || '',
            },
            successMessage: '',
            errorMessage: '',
        };
    },
    async mounted() {
        const companyId = this.$route.params.companyId ?? '';

        if (companyId) {
            const res = await this.$api.get(`companies/${companyId}`);

            if (res.status === 200) {
                this.form = res.data;
                this.company.id = companyId;
            } else {
                this.errorMessage = 'Failed to fetch company data.';
            }
        }
    },
    computed: {
        isEditing() {
            return !!this.company.id;
        },
    },
    methods: {
        async handleSubmit() {
            this.successMessage = '';
            this.errorMessage = '';

            try {
                if (this.isEditing) {
                    const res = await this.$api.put(`/companies/${this.company.id}`, this.form);
                    if (res.status === 200) {
                        this.successMessage = 'Company updated successfully.';
                    } else {
                        this.errorMessage = 'On error occurred. Please try again.';
                    }
                } else {
                    const res = await this.$api.post('companies', this.form);

                    if (res.status === 201) {
                        this.successMessage = 'Company created successfully!';
                        this.resetForm();
                    } else {
                        this.errorMessage = 'Failed to create company record.';
                    }

                }
            } catch (error) {
                this.errorMessage = 'An error occurred: ' + (error.response?.data?.message || error.message);
            }
        },
        resetForm() {
            this.form = {
                name: '',
                logo: '',
                status: '',
            };
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>