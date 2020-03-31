"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const ora = require("ora");
const fp_1 = require("lodash/fp");
const formatMessages = require("webpack-format-messages");
// const syntaxErrorLabel = 'Syntax error:'
const LOG_MAP = {
    ["weapp" /* WEAPP */]: {
        OPEN: '请打开微信小程序开发者工具进行查看'
    },
    ["alipay" /* ALIPAY */]: {
        OPEN: '请打开支付宝小程序开发者工具进行查看'
    },
    ["qq" /* QQ */]: {
        OPEN: '请打开 QQ 小程序开发者工具进行查看'
    },
    ["swan" /* SWAN */]: {
        OPEN: '请打开百度智能小程序开发者工具进行查看'
    },
    ["tt" /* TT */]: {
        OPEN: '请打开字节跳动小程序开发者工具进行查看'
    },
    ["jd" /* JD */]: {
        OPEN: '请打开京东小程序开发者工具进行查看'
    },
    ["quickapp" /* QUICKAPP */]: {
        OPEN: '请按快应用端开发流程 https://taro-docs.jd.com/taro/docs/quick-app.html 进行查看'
    }
};
const getServeSpinner = (() => {
    let spinner;
    return () => {
        if (!spinner) {
            spinner = ora(`即将开始启动编译，请稍等~`);
            spinner.start();
        }
        return spinner;
    };
})();
exports.getServeSpinner = getServeSpinner;
const printCompiling = () => {
    getServeSpinner().text = '正在编译...';
};
exports.printCompiling = printCompiling;
const printBuildError = (err) => {
    const message = err.message;
    const stack = err.stack;
    if (stack && message.indexOf('from UglifyJs') !== -1) {
        try {
            const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack);
            if (!matched) {
                throw new Error('Using errors for control flow is bad.');
            }
            const problemPath = matched[2];
            const line = matched[3];
            const column = matched[4];
            console.log('Failed to minify the code from this file: \n\n', chalk_1.default.yellow(`\t${problemPath}:${line}${column !== '0' ? ':' + column : ''}`), '\n');
        }
        catch (ignored) {
            console.log('Failed to minify the bundle.', err);
        }
    }
    else {
        console.log((message || err) + '\n');
    }
    console.log();
};
exports.printBuildError = printBuildError;
const printSuccess = (buildAdapter) => {
    getServeSpinner().stopAndPersist({
        symbol: '✅ ',
        text: isFirst ? chalk_1.default.green(`编译成功，${LOG_MAP[buildAdapter].OPEN}\n`) : chalk_1.default.green(`编译成功\n`)
    });
};
const printWarning = () => {
    getServeSpinner().stopAndPersist({
        symbol: '⚠️ ',
        text: chalk_1.default.yellow('编译警告.\n')
    });
};
const printFailed = () => {
    getServeSpinner().stopAndPersist({
        symbol: '🙅  ',
        text: chalk_1.default.red('编译失败.\n')
    });
};
const printWhenBeforeCompile = compiler => {
    compiler.hooks.beforeCompile.tap('taroBeforeCompile', filepath => {
        printCompiling();
    });
    return compiler;
};
const printWhenInvalid = compiler => {
    compiler.hooks.invalid.tap('taroInvalid', filepath => {
        printCompiling();
    });
    return compiler;
};
const printWhenFailed = compiler => {
    compiler.hooks.failed.tap('taroFailed', error => {
        printBuildError(error);
    });
    return compiler;
};
let isFirst = true;
const printWhenFirstDone = (compiler) => {
    compiler.hooks.done.tap('taroDone', stats => {
        if (isFirst) {
            isFirst = false;
            getServeSpinner().clear();
            console.log(chalk_1.default.gray('\n监听文件修改中...\n'));
        }
    });
    return compiler;
};
const _printWhenDone = ({ verbose = false }, buildAdapter, compiler) => {
    compiler.hooks.done.tap('taroDone', stats => {
        const { errors, warnings } = formatMessages(stats);
        if (!stats.hasErrors() && !stats.hasWarnings()) {
            printSuccess(buildAdapter);
        }
        if (stats.hasErrors()) {
            printFailed();
            errors.forEach(e => console.log(e + '\n'));
            verbose && process.exit(1);
            return;
        }
        if (stats.hasWarnings()) {
            printWarning();
            warnings.forEach(w => console.log(w + '\n'));
        }
        verbose && console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            warnings: verbose
        }) + '\n');
    });
    return compiler;
};
const printWhenDone = fp_1.partial(_printWhenDone, [{ verbose: false }]);
const printWhenDoneVerbosely = fp_1.partial(_printWhenDone, [{ verbose: true }]);
const bindDevLogger = (compiler, buildAdapter) => {
    console.log();
    fp_1.pipe(printWhenBeforeCompile, fp_1.partial(printWhenDone, [buildAdapter]), printWhenFailed, printWhenInvalid, printWhenFirstDone)(compiler);
    return compiler;
};
exports.bindDevLogger = bindDevLogger;
const bindProdLogger = (compiler, buildAdapter) => {
    console.log();
    fp_1.pipe(printWhenBeforeCompile, fp_1.partial(printWhenDoneVerbosely, [buildAdapter]), printWhenFailed)(compiler);
    return compiler;
};
exports.bindProdLogger = bindProdLogger;
