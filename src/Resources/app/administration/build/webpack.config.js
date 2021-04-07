const { join, resolve } = require('path');
module.exports = () => {
    return {
        resolve: {
            alias: {
                '@ace-builds': resolve(
                    join('node_modules', 'ace-builds', 'src-noconflict')
                )
            }
        }
    };
}
