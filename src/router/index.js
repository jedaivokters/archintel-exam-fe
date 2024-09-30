import Vue from 'vue';
import Router from 'vue-router';
import Test from '../components/Test.vue';
import SuperAdminDashboard from '../components/SuperAdmin/SuperAdminDashboard.vue';
import UserList from '../components/SuperAdmin/UserList.vue';
import WriterAdminDashboard from '../components/WriterAdmin/WriterAdminDashboard.vue';
import ArticlesIndex from '@/components/WriterAdmin/ArticlesIndex.vue';
import ArticlesAll from '@/components/WriterAdmin/ArticlesAll.vue';
import UserForm from '@/components/SuperAdmin/UserForm.vue';
import ArticleForm from '@/components/SuperAdmin/ArticleForm.vue';
import EditorAdminDashboard from '@/components/EditorAdmin/EditorAdminDashboard.vue';
import {default as EditorArticleIndex} from '@/components/EditorAdmin/ArticlesIndex.vue';
import {default as EditorManageUers} from '@/components/EditorAdmin/UserList.vue';
import CompanyForm from '@/components/EditorAdmin/CompanyForm.vue';
import CompanyList from '@/components/EditorAdmin/CompanyList.vue';
import {default as EditorArticlesAll } from '@/components/EditorAdmin/ArticlesAll.vue';

Vue.use(Router);

const routes = [
  {
    path: '/superadmin',
    name: 'superadmin',
    component: SuperAdminDashboard,
    redirect: { name: 'users' },
    children: [
      { path: 'users', name: 'users', component: UserList },
      { path: 'create/user', name: 'userCreate', component: UserForm },
      // Add other superadmin routes if needed
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/writer/:id',
    name: 'writer',
    component: WriterAdminDashboard,
    redirect: { name: 'writerIndex' },
    children: [
      { path: '/writer/:id', name: 'writerIndex', component: ArticlesIndex },
      { path: '/writer/:id/all', name: 'writerAllMedia', component: ArticlesAll },
      { path: '/writer/:id/article', name: 'writerCreateArticle', component: ArticleForm,  meta: { writer: true }},
      { path: '/writer/:id/article/edit/:articleId', name: 'writerArticleEdit', component: ArticleForm,  meta: { writer: true }},
      // { path: 'for-edit', name: 'for-edit', component: ForEditList },
    ],
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: EditorAdminDashboard,
    redirect: { name: 'editorIndex' },
    children: [
      { path: '/editor/:id', name: 'editorIndex', component: EditorArticleIndex },
      { path: 'all', name: 'editorAllMedia', component: EditorArticlesAll },
      { path: 'manage/create/user', name: 'editorUserCreate', component: UserForm },
      { path: 'manage/user/:userId', name: 'editorUserEdit', component: UserForm },
      { path: 'manage/users', name: 'editorManageUsers', component: EditorManageUers },
      { path: 'manage/companies', name: 'editorManageCompanies', component: CompanyList },
      { path: 'manage/company/:companyId', name: 'editorCompanyEdit', component: CompanyForm },
      { path: 'manage/create/company', name: 'editorCompanyCreate', component: CompanyForm },
      { path: 'article/edit/:articleId', name: 'editorArticleEdit', component: ArticleForm,  meta: { editor: true }}
    ],
  },
  // Define routes for Editor Dashboard similarly
];

export default new Router({
  mode: 'history',
  routes,
});