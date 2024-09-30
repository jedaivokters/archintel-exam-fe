<template>
    <div class="container mt-5">
        <h2>{{ isEditing ? 'Edit Article' : 'Create Article' }}</h2>

        <!-- Success and Error Messages -->
        <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="imageUrl" class="form-label">Image URL</label>
                <input type="url" class="form-control" id="imageUrl" v-model="form.image" required />
            </div>

            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="form.title" required />
            </div>

            <div class="mb-3">
                <label for="link" class="form-label">Link</label>
                <input type="url" class="form-control" id="link" v-model="form.link" required />
            </div>

            <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" v-model="form.date" required />
            </div>

            <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <div ref="quillEditor" class="quill-editor mb-2"></div>
            </div>

            <div class="mb-3">
                <label for="company" class="form-label">Company</label>
                <select class="form-select" id="company" v-model="form.company_id" required>
                    <option value="" disabled>Select Company</option>
                    <option v-for="company in companies" :key="company.id" :value="company.id">
                        {{ company.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary me-3">
                {{ isEditing ? 'Save Article' : 'Create Article' }}
            </button>

            <button v-if="isEditor()" type="button" class="btn btn-primary" @click.prevent="handleSubmit" id="published">
                Published
            </button>
            
        </form>
    </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
    name: 'ArticleForm',
    data() {
        return {
            article: {
                id: '',
            },
            form: {
                image: this.article?.imageUrl || '',
                title: this.article?.title || '',
                link: this.article?.link || '',
                date: this.article?.date || this.getCurrentDate(),
                content: this.article?.content || '',
                company_id: this.article?.company || '',
            },
            companies: [],
            successMessage: '',
            errorMessage: '',
            quill: null,
        };
    },
    computed: {
        isEditing() {
            return !!this.article.id;
        },
    },
    async mounted() {
        const userId = this.$route.params.id ?? '';
        const articleId = this.$route.params.articleId ?? '';

        const res = await this.$api.get('companies');
        if (res.status === 200) {
            this.companies = res.data;
        } else {
            this.errorMessage = 'Failed to fetch companies';
        }

        if (articleId) {
            const res = await this.$api.get(`articles/${articleId}`);

            if (res.status === 200) {
                this.form = res.data;
                this.article.id = articleId;
            } else {
                this.errorMessage = 'Failed to fetch article data.';
            }
        }

        this.quill = new Quill(this.$refs.quillEditor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'clean'],
                ],
            },
        });

        if (this.form.content) {
            this.quill.root.innerHTML = this.form.content;
        }

        this.quill.on('text-change', () => {
            this.form.content = this.quill.root.innerHTML;
        });

        const isWriter = this.$route.meta.writer ?? false

        if (isWriter) {
            this.form.writer_id = userId;
        }

        if (this.isEditor()) {
            this.form.editor_id = userId;
        }
    },
    methods: {
        async handleSubmit(e) {
            const isPublished = e.target.id == 'published';
            const isWriter = this.$route.meta.writer ?? false

            if (this.isEditing) {
                if (isWriter && this.form.status == 'Published') {
                    this.errorMessage = 'Cannot edit a published article.';
                    return;
                }

                if (isPublished) {
                    this.form.status = 'Published';
                }

                const res = await this.$api.put(`articles/${this.article.id}`, this.form);

                if (res.status === 200) {
                    this.successMessage = 'Article updated successfully.';
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    this.errorMessage = 'An error occurred. Please try again.';
                }

            } else {
                if (isWriter) {
                    this.form.status = 'For Edit';
                }

                const res = await this.$api.post(`articles/`, this.form);

                if (res.status === 201) {
                    this.successMessage = 'Article created successfully.';
                    this.resetForm();
                } else {
                    this.errorMessage = 'An error occurred. Please try again.';
                }
            }

            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 5000);
        },
        resetForm() {
            this.form = {
                imageUrl: '',
                title: '',
                link: '',
                date: this.getCurrentDate(),
                content: '',
                company: '',
            };
            this.quill.setContents([]); // Clear the editor
        },
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
        },
        isEditor() {
            return this.$route.meta.editor ?? false;
        },
    },
};
</script>

<style scoped>
.quill-editor {
    height: 200px;
    /* Set the height of the editor */
    margin-bottom: 1rem;
    /* Add some margin below the editor */
}
</style>