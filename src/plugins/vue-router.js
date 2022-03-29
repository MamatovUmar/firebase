import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../router';
import firebase from 'firebase';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    const user = firebase.auth().currentUser;
    if (to.matched.some((m) => m.meta.auth) && !user) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

Vue.router = router;

export default {
    router,
};
