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
            privileges: ['dne_custom_js_css:update'],
            dependencies: []
        },
        creator: {
            privileges: ['dne_custom_js_css:create'],
            dependencies: []
        },
        deleter: {
            privileges: ['dne_custom_js_css:delete'],
            dependencies: []
        }
    }
});
