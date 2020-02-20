import template from './dne-module-detail.html.twig';

const { Component, Mixin } = Shopware;
const { mapApiErrors } = Shopware.Component.getComponentHelper();

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

    props: {
        moduleId: {
            type: String,
            required: false,
            default: null
        }
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
        },
        ...mapApiErrors('module', ['name'])
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');
        this.getModule();

        this.syncService = Shopware.Service('syncService');
        this.httpClient = this.syncService.httpClient;
    },

    methods: {
        getModule() {
            if (this.moduleId) {
                this.repository
                    .get(this.moduleId, Shopware.Context.api)
                    .then((entity) => {
                        this.module = entity;
                    });
            } else {
                this.module = this.repository.create(Shopware.Context.api);
            }
        },

        onClickSave() {
            this.isLoading = true;

            return this.repository
                .save(this.module, Shopware.Context.api)
                .then(() => {
                    if (!this.moduleId) {
                        this.moduleId = this.module.id;
                    }
                    this.getModule();
                    this.isLoading = false;
                    this.processSuccess = true;
                }).catch((exception) => {
                    this.isLoading = false;
                    if (module.name && module.name.length) {
                        this.createNotificationError({
                            title: 'Error',
                            message: exception
                        });
                    }
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
