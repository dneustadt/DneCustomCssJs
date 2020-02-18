import template from './dne-module-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('dne-module-detail', {
    template,

    inject: [
        'repositoryFactory',
        'context'
    ],


    mixins: [
        Mixin.getByName('notification')
    ],

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            syncService: null,
            httpClient: null,
            module: null,
            isLoading: false,
            processSuccess: false,
            repository: null
        };
    },

    computed: {
        editorConfigJs() {
            return {
                mode: 'ace/mode/javascript'
            };
        },
        editorConfigSass() {
            return {
                mode: 'ace/mode/css'
            };
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');
        this.getModule();

        this.syncService = Shopware.Service('syncService');
        this.httpClient = this.syncService.httpClient;
    },

    methods: {
        getModule() {
            this.repository
                .get(this.$route.params.id, Shopware.Context.api)
                .then((entity) => {
                    this.module = entity;
                });
        },

        onClickSave() {
            this.isLoading = true;

            return this.repository
                .save(this.module, Shopware.Context.api)
                .then(() => {
                    this.getModule();
                    this.isLoading = false;
                    this.processSuccess = true;
                }).catch((exception) => {
                    this.isLoading = false;
                    this.createNotificationError({
                        title: 'Error',
                        message: exception
                    });
                });
        },

        onClickSaveCompile () {
            this.onClickSave().then(() => {
                this.isLoading = true;

                const basicHeaders = {
                    Authorization: `Bearer ${Shopware.Context.api.authToken.access}`,
                    'Content-Type': 'application/json'
                };

                this.httpClient.get('_action/dne-customcssjs/compile', { headers: basicHeaders }).then(() => {
                    this.isLoading = false;
                }).catch((exception) => {
                    this.isLoading = false;
                    this.createNotificationError({
                        title: 'Error',
                        message: exception
                    });
                });
            });
        },

        saveFinish() {
            this.processSuccess = false;
        }
    }
});
