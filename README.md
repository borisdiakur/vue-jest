# vue-jest

A jest preprocessor for jest.

# Usage

Add the following lines to your `package.json`

    "jest": {
        "unmockedModulePathPatterns": [
            "<rootDir>/node_modules/vue"
        ],
        "moduleFileExtensions": [
            "js",
            "vue"
        ],
        "scriptPreprocessor": "index.js"
    }

Then just see the `__tests__` for some examples.

