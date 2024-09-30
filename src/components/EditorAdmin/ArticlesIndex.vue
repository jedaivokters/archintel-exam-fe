<template>
    <div class="container">
        <div class="row">
            <h2 class="my-4">For Edit</h2>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Writer</th>
                            <th>Editor</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="article in articlesEdits" :key="article.id">
                            <td>{{ article.image }}</td>
                            <td>{{ article.title }}</td>
                            <td>{{ article.link }}</td>
                            <td>{{ article.writer.firstname + ' ' + article.writer.lastname }}</td>
                            <td>{{ editorName(article) }}</td>
                            <td>{{ article.status }}</td>
                            <td>
                                <button class="btn btn-primary" @click="editArticle(article)">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <h2 class="my-4">Published</h2>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Writer</th>
                            <th>Editor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="article in articlesPublished" :key="article.id">
                            <td>{{ article.image }}</td>
                            <td>{{ article.title }}</td>
                            <td>{{ article.link }}</td>
                            <td>{{ article.writer.firstname + ' ' + article.writer.lastname }}</td>
                            <td>{{ editorName(article) }}</td>
                            <td>{{ article.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditorArticleIndex',
    data() {
        return {
            editorId: this.$route.params.id ?? 0,
            editor: {},
            articlesEdits: [],
            articlesPublished: [],
        };
    },
    async mounted() {
        let res = await this.$api.get(`users/${this.editorId}`);
        if (res.status === 200) {
            this.editor = res.data;

            if (this.editor.type !== 'Editor') {
                this.$router.push({ name: 'superadmin' });
            }
        } else {
            this.$router.push({ name: 'superadmin' });
        }

        let params = {
            status: 'For Edit'
        };

        res = await this.$api.get('articles', { params });

        if (res.status === 200) {
            this.articlesEdits = res.data;
        } else {
            alert('Failed to fetch articles');
        }

        params = {
            status: 'Published'
        };
        res = await this.$api.get('articles', { params });

        if (res.status === 200) {
            this.articlesPublished = res.data;
        } else {
            alert('Failed to fetch articles');
        }
    },
    methods: {
        editorName(article) {
            if (!article.editor) {
                return '';
            }

            return article.editor.firstname + ' ' + article.editor.lastname;
        },
        editArticle(article) {
            this.$router.push({ name: 'editorArticleEdit', params: { articleId: article.id } });
        },
    },
};
</script>