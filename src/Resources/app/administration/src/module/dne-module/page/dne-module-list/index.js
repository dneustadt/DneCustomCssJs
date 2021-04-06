import template from './dne-module-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('dne-module-list', {
    template,

    inject: [
        'repositoryFactory',
        'context',
        'acl'
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
            return [
                {
                    property: 'active',
                    label: this.$t('dne-customcssjs.modules.activeLabel'),
                    allowResize: false,
                    align: 'center',
                    width: '125px'
                },
                {
                    property: 'name',
                    dataIndex: 'name',
                    label: this.$t('dne-customcssjs.modules.nameLabel'),
                    routerLink: 'dne.module.detail',
                    allowResize: true,
                    primary: true
                },
                {
                    property: 'salesChannels',
                    dataIndex: 'salesChannels',
                    label: this.$t('dne-customcssjs.modules.salesChannelsLabel'),
                    allowResize: true,
                    sortable: false
                }
            ];
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');

        const httpClient = Shopware.Service('syncService').httpClient;
        const basicHeaders = {
            Authorization: `Bearer ${Shopware.Context.api.authToken.access}`,
            'Content-Type': 'application/json'
        };
        const criteria = new Criteria();

        criteria.addAssociation('salesChannels');
        criteria.addSorting(Criteria.sort('name', 'ASC', false));

        this.repository
            .search(criteria, Shopware.Context.api)
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
