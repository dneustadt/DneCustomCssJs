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
            modules: null,
            isLoading: true
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

        const httpClient = Shopware.Service('syncService').httpClient;
        const basicHeaders = {
            Authorization: `Bearer ${Shopware.Context.api.authToken.access}`,
            'Content-Type': 'application/json'
        };

        this.repository
            .search(new Criteria(), Shopware.Context.api)
            .then((result) => {
                this.modules = result;
                this.isLoading = false;

                this.$nextTick().then(() => {
                    this.$refs.listing.$on('delete-item-finish', () => {
                        this.isLoading = true;
                        httpClient.get('_action/dne-customcssjs/compile', { headers: basicHeaders }).then(() => {
                            this.isLoading = false;
                        }).catch(() => {
                            this.isLoading = false;
                        });
                    });
                });
            });
    }
});
