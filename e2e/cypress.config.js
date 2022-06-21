const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },   
        videoCompression: 1,
        baseUrl          : "http://localhost:3000"  
    },
});
