import type { UserModule } from '~/types';

export const install: UserModule = ({ router }) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.length === 0) {
            router.push('/404').then(() => {});
        }
        next();
    });
};
