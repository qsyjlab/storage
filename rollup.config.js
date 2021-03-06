

import path from "path";
import jsonPlugin from '@rollup/plugin-json'
import resolvePlugin  from '@rollup/plugin-node-resolve';
import typescript2Plugin from 'rollup-plugin-typescript2'
import commonJs from 'rollup-plugin-commonjs'


const _resolve = (p) => path.resolve(__dirname, p);

const pkg = require(_resolve("package.json"));

const distName = pkg.name.split('/')[1]
const outputConfig = {

    'esm-bundler':{
        file:_resolve(`dist/${distName}.esm-bundler.js`),
        format:'es'
    },
    'global':{
        file:_resolve(`dist/${distName}.global.js`),
        format:'iife'

    },
}



const options = pkg.buildOptions

function createConfig(format,output){

    output.name = options.name

    output.sourcemap = process.env.SOURCE_MAP === 'true' ? true : false

    return {
        input:'src/index.ts',
        output,
        plugins:[
            jsonPlugin(),
            typescript2Plugin({
                tsconfig:_resolve('tsconfig.json')
            }),
            resolvePlugin(),
            commonJs() // 解析第三方模块

        ]
    }


}

export default options.formats.map(_format =>{
    return createConfig(_format,outputConfig[_format])
})


// export default {};
