import './page/dne-module-list';
import './page/dne-module-detail';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('dne-module', {
    color: '#ff3d58',
    icon: 'default-text-code',
    title: 'dne-customcssjs.modules.title',
    description: '',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'dne-module-list',
            path: 'list'
        },
        detail: {
            component: 'dne-module-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'dne.module.list'
            },
            props: {
                default(route) {
                    return {
                        moduleId: route.params.id
                    };
                }
            }
        },
        create: {
            component: 'dne-module-detail',
            path: 'create',
            meta: {
                parentPath: 'dne.module.list'
            }
        }
    },

    navigation: [{
        label: 'dne-customcssjs.modules.menu',
        path: 'dne.module.list',
        parent: 'sw-settings',
        position: 100
    }]
});
