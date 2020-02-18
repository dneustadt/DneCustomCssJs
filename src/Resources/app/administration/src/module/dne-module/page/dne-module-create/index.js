const { Component } = Shopware;

Component.extend('dne-module-create', 'dne-module-detail', {
    methods: {
        getModule() {
            this.module = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.module, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({ name: 'dne.module.list' });
                }).catch((exception) => {
                    this.isLoading = false;

                    this.createNotificationError({
                        title: 'Error',
                        message: exception
                    });
                });
        }
    }
});
