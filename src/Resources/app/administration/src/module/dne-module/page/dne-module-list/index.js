import template from './dne-module-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('dne-module-list', {
    template,

    inject: [
        'repositoryFactory',
        'context',
        'acl',
        'themeService',
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
        },

        salesChannelRepository() {
            return this.repositoryFactory.create('sales_channel');
        },
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');

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
                        this.compileTheme().then(() => {
                            this.isLoading = false;
                        }).catch(() => {
                            this.isLoading = false;
                        });
                    });
                });
            });
    },

    methods: {
        async compileTheme() {
            const criteria = new Criteria();
            criteria.addAssociation('themes');

            const salesChannels = await this.salesChannelRepository.search(criteria, Shopware.Context.api);

            for (let salesChannel of salesChannels) {
                const theme = salesChannel.extensions.themes.first();

                if (theme) {
                    await this.themeService.assignTheme(theme.id, salesChannel.id);
                }
            }
        },
    },
});
