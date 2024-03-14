import template from './dne-module-detail.html.twig';
import './dne-module-detail.scss';

const { Component, Mixin, Filter } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();
const { Criteria } = Shopware.Data;

Component.register('dne-module-detail', {
    template,

    inject: [
        'repositoryFactory',
        'context',
        'acl',
        'themeService',
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
                mode: 'ace/mode/javascript',
                useWorker: false
            };
        },
        editorConfigSass() {
            return {
                mode: 'ace/mode/css'
            };
        },
        salesChannelRepository() {
            return this.repositoryFactory.create('sales_channel');
        },
        ...mapPropertyErrors('module', ['name'])
    },

    created() {
        this.repository = this.repositoryFactory.create('dne_custom_js_css');
        this.getModule();

        this.syncService = Shopware.Service('syncService');
        this.httpClient = this.syncService.httpClient;
    },

    methods: {
        getModule() {
            if (this.moduleId || this.module?.id) {
                this.repository
                    .get(this.moduleId || this.module?.id, Shopware.Context.api)
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
                        this.$router.push({ name: 'dne.module.detail', params: { id: this.module.id } });
                    }
                    this.getModule();
                    this.isLoading = false;
                    this.processSuccess = true;
                }).catch((exception) => {
                    this.isLoading = false;
                    if (this.module.name && this.module.name.length) {
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

                this.compileTheme().then(() => {
                    this.isLoading = false;
                }).catch((errorResponse) => {
                    this.isLoading = false;
                    try {
                        this.createNotificationError({
                            title: errorResponse.response.data.errors[0].title,
                            message: Filter.getByName('truncate')(errorResponse.response.data.errors[0].detail, 300),
                            autoClose: false
                        });
                    } catch(e) {
                        this.createNotificationError({
                            title: errorResponse.title,
                            message: errorResponse.message,
                            autoClose: false
                        });
                    }
                });
            });
        },

        saveFinish() {
            this.processSuccess = false;
        },

        pickColor(hex) {
            if (!this.$refs.cssEditor) {
                return;
            }

            const editor = this.$refs.cssEditor.editor;

            if (!editor) {
                return;
            }

            editor.session.insert(editor.getCursorPosition(), hex);
            editor.renderer.scrollCursorIntoView(editor.getCursorPosition(), 0.5);
        },

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
