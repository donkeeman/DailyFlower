module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/scss/_reset";
                @import "@/assets/scss/_variables";
                @import "@/assets/scss/_mixins";
                `,
            },
        },
    },
};
