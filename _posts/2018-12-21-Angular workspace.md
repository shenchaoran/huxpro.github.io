workspace: 一个 workspace 可以包含多个项目 (lib, application)，以 [ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) 为例，包括有 `ng-zorro-antd-lib, ng-zorro-antd-doc`。每个项目中配置了多个 architect，默认添加的 architect 有 `build, serve, lint, test, extract-i18n`，可以直接运行 `ng <default-architect>`，其他自定义的 architect 可以通过 `ng run <project-name>:<architect-name>:<configuration-name>` 来运行。

每个 architect 下包括有 builder, options, configurations。builder 可以选择？？？；options 定义默认的编译选项；configurations 下定义不同的环境，用来覆盖 options 中的默认选项。

![](/img/in-post/angular/cli/build-config-targets.gif)

``` json
{
    // json schema path
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "projects",
    "projects": {
        // project name
        "CMIP-frontend": {
            "root": "",
            "sourceRoot": "src",
            "projectType": "application",
            "architect": {
                // ng build config
                "build": {
                    "builder": "@angular-builders/custom-webpack:browser",
                    "options": {
                        "customWebpackConfig": {
                            "path": "./extra-webpack.config.js",
                            "mergeStrategies": {
                                "loaders": "replace"
                            },
                            "replaceDuplicatePlugins": true
                        },
                        "deleteOutputPath": true,
                        "outputPath": "build-prod",
                        "watch": true,
                        "vendorChunk": true,
                        "commonChunk": true,
                        "statsJson": true,
                        "index": "src/index.html",
                        "main": "src/main.ts",
                        "tsConfig": "src/tsconfig.app.json",
                        "polyfills": "src/polyfills.ts",
                        "assets": [
                            "src/assets",
                            "src/config",
                            "src/browser-download.html",
                            "src/favicon.ico"
                        ],
                        "styles": [
                            "src/styles.scss"
                        ],
                        "stylePreprocessorOptions": {
                            "includePaths": [
                                "node_modules"
                            ]
                        },
                        "scripts": [
                            "node_modules/lodash/lodash.min.js",
                            "node_modules/jquery/dist/jquery.min.js",
                            "src/assets/js/jexcel/js/jquery.jexcel.js",
                            "node_modules/material-components-web/dist/material-components-web.min.js"
                        ]
                    },
                    "configurations": {
                        "hmr": {
                            "fileReplacements": [{
                                "replace": "src/environments/environment.ts",
                                "with": "src/environments/environment.hmr.ts"
                            }]
                        },
                        "prod": {
                            "outputPath": "build-prod",
                            "optimization": false,
                            "buildOptimizer": false,
                            "outputHashing": "all",
                            "sourceMap": true,
                            "extractCss": true,
                            "namedChunks": false,
                            "aot": true,
                            "extractLicenses": true,
                            "vendorChunk": false,
                            "fileReplacements": [{
                                "replace": "src/environments/environment.ts",
                                "with": "src/environments/environment.prod.ts"
                            }]
                        },
                        "prod-optimizer": {
                            "optimization": true,
                            "outputHashing": "all",
                            "sourceMap": false,
                            "extractCss": true,
                            "namedChunks": false,
                            "aot": true,
                            "extractLicenses": true,
                            "vendorChunk": false,
                            "buildOptimizer": false,
                            "outputPath": "build-prod-optimizer",
                            "fileReplacements": [{
                                "replace": "src/environments/environment.ts",
                                "with": "src/environments/environment.prod.ts"
                            }]
                        }
                    }
                },
                // ng serve config
                "serve": {
                    "builder": "@angular-builders/dev-server:generic",
                    "options": {
                        "proxyConfig": "proxy.conf.json",
                        "open": false,
                        "liveReload": true,
                        "hmrWarning": false,
                        "baseHref": "/CMIP/",
                        "port": 8888,
                        "host": "localhost",
                        "hmr": true,
                        // refer to build architect and hmr configuration
                        "browserTarget": "CMIP-frontend:build:hmr"
                    },
                    "configurations": {
                        "aot": {
                            "browserTarget":"CMIP-frontend:build",
                            "aot": true,
                            "optimization": true,
                            "open": true,
                            "hmr": false,
                            "sourceMap": true
                        }
                    }
                },
                "extract-i18n": {
                    // ...
                },
                "test": {
                    // ...
                },
                "lint": {
                    // ...
                }
            }
        },
        "CMIP-frontend-e2e": {
            "root": "",
            "sourceRoot": "e2e",
            "projectType": "application",
            "architect": {
                // ...
            }
        }
    },
    "defaultProject": "CMIP-frontend",
    "schematics": {
        "@schematics/angular:class": {
            "spec": false
        }
        // ...
    }
}

```

# 参考
- [Angular Workspace Configuration](https://angular.io/guide/workspace-config)