import './page/dne-module-list';
import './page/dne-module-detail';
import './page/dne-module-create';
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
            }
        },
        create: {
            component: 'dne-module-create',
            path: 'create',
            meta: {
                parentPath: 'dne.module.list'
            }
        }
    },

    navigation: [{
        label: 'dne-customcssjs.modules.menu',
        color: '#ff3d58',
        path: 'dne.module.list',
        icon: 'default-text-code',
        position: 100
    }]
});
