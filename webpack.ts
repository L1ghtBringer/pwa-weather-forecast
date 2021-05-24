module.exports = {
    webpack: function(config) {
        config.resolve.modules = [...config.resolve.modules, 'src']
        return config;
    },
}