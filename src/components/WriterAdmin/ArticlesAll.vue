<template>
    <div class="container">
        <div class="row">
            <h2 class="my-4">All Media</h2>
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
                        <tr v-for="article in articles" :key="article.id">
                            <td>{{ article.image }}</td>
                            <td>{{ article.title }}</td>
                            <td>{{ article.link }}</td>
                            <td>{{ article.writer.firstname + ' ' + article.writer.lastname }}</td>
                            <td>{{ editorName(article) }}</td>
                            <td>{{ article.status }}</td>
                            <td>
                                <button v-if="checkAccess(article)" class="btn btn-primary"
                                    @click="editArticle(article)">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WriterArticlesAll',
    data() {
        return {
            articles: [],
        };
    },
    async mounted() {
        const res = await this.$api.get('articles');

        if (res.status === 200) {
            this.articles = res.data;
        } else {
            alert('Failed to fetch articles');
        }
    },
    methods: {
        editArticle(article) {
            this.$router.push({ name: 'writerArticleEdit', params: { articleId: article.id, id: this.$route.params.id ?? '' } });
        },
        checkAccess(article) {
            return article.status == 'For Edit';
        },
        editorName(article) {
            if (!article.editor) {
                return '';
            }

            return article.editor.firstname + ' ' + article.editor.lastname;
        },
    },
};
</script>