module.exports = {
    baseUrl: `http://localhost:3000`,
    gridUrl: 'http://0.0.0.0:4444/wd/hub',
    compositeImage: true,

    sets: {
        common: {
            files: './tests/integration/*.js'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    },

    plugins: {
        'html-reporter/hermione': {
            path: './tests/hermione-html-report',
            defaultView: 'all'
        }
    },

    screenshotsDir: "./tests/hermione/screens"
};