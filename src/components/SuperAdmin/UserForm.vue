<template>
    <div class="container mt-5">
        <h2>{{ isEditing ? 'Edit User' : 'Create User' }}</h2>

        <!-- Success and Error Messages -->
        <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="form.firstname" required />
            </div>

            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="form.lastname" required />
            </div>

            <div class="mb-3">
                <label for="userType" class="form-label">Type</label>
                <select class="form-select" id="userType" v-model="form.type" required>
                    <option value="" disabled>Select Type</option>
                    <option value="Writer">Writer</option>
                    <option value="Editor">Editor</option>
                </select>
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
                {{ isEditing ? 'Update User' : 'Create User' }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'UserForm',
    data() {
        return {
            successMessage: '',
            errorMessage: '',
            user: {
                id: '',
            },
            form: {
                firstname: this.user?.firstname || '',
                lastname: this.user?.lastname || '',
                type: this.user?.type || '',
                status: this.user?.status || '',
            },
        };
    },
    async mounted() {
        const userId = this.$route.params.userId ?? '';
    
        if (userId) {
            const res = await this.$api.get(`users/${userId}`);

            if (res.status === 200) {
                this.form = res.data;
                this.user.id = userId;
            } else {
                this.errorMessage = 'Failed to fetch user data.';
            }
        }
    },
    computed: {
        isEditing() {
            return !!this.user.id;
        },
    },
    methods: {
        async handleSubmit() {
            if (this.isEditing) {
                const res = await this.$api.put(`/users/${this.user.id}`, this.form);
                if (res.status === 200) {
                    this.successMessage = 'User updated successfully.';
                } else {
                    this.errorMessage = 'On error occurred. Please try again.';
                }
            } else {
                const res = await this.$api.post(`/users/`, this.form);

                if (res.status === 201) {
                    this.successMessage = 'User created successfully.';
                    this.resetForm();
                } else {
                    this.errorMessage = 'On error occurred. Please try again.';
                }
            }

            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 5000);
        },
        resetForm() {
            this.form = {
                firstName: '',
                lastName: '',
                type: '',
                status: '',
            };
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 500px;
}
</style>