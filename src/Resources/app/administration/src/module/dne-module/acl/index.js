Shopware.Service('privileges').addPrivilegeMappingEntry({
    category: 'permissions',
    parent: null,
    key: 'dne_custom_js_css',
    roles: {
        viewer: {
            privileges: ['dne_custom_js_css:read'],
            dependencies: []
        },
        editor: {
            privileges: [
                'dne_custom_js_css:update',
                'dne_custom_js_css_sales_channel:create',
                'dne_custom_js_css_sales_channel:delete'
            ],
            dependencies: []
        },
        creator: {
            privileges: [
                'dne_custom_js_css:create',
                'dne_custom_js_css_sales_channel:create',
                'dne_custom_js_css_sales_channel:delete'
            ],
            dependencies: []
        },
        deleter: {
            privileges: ['dne_custom_js_css:delete'],
            dependencies: []
        }
    }
});
