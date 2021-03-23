import template from './dne-module-detail.html.twig';
import './vendor/mode-scss';

const { Component, Mixin, Filter } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

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
                mode: 'ace/mode/scss'
            };
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
        }
    }
});
