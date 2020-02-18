import template from './dne-module-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('dne-module-list', {
    template,

    inject: [
        'repositoryFactory',
        'context'
    ],

    data() {
        return {
            repository: null,
            modules: null
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },


    computed: {
        columns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                label: this.$t('dne-customcssjs.modules.nameLabel'),
                routerLink: 'dne.module.detail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true
            }];
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');

        this.repository
            .search(new Criteria(), Shopware.Context.api)
            .then((result) => {
                this.modules = result;
            });
    }
});
