import vueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(vueRouter);

import Home from "./pages/Home";
import Login from "./pages/Login";


const routes = [
    {path: '/', component: require('./pages/Home').default},
    {path: '/login', component: require('./pages/Login').default},

];

export default new vueRouter({
    mode: "history",
    routes
});
