export default function customReplacePlugin(options = {}) {

    return {
        name: 'custom-replace',
        async transform(code, id) {
            if(id.endsWith('rapier_wasm2d.js')){
              console.log(id)
             code =  code.replace("typeof module_or_path === 'string' ||","")
             console.log('customReplacePlugin  suss')
            }
            return code
        }
      
    };
}