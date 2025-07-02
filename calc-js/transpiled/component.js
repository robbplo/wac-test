import { inc } from 'math:inc/inc';

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const instantiateCore = WebAssembly.instantiate;

const toUint64 = val => BigInt.asUintN(64, BigInt(val));



function trampoline0(arg0) {
  const ret = inc(BigInt.asUintN(64, arg0));
  return toUint64(ret);
}

let exports0;
let postReturn0;
let exports0Calc;

function calc(arg0, arg1) {
  var val0 = arg0;
  let enum0;
  switch (val0) {
    case 'increment': {
      enum0 = 0;
      break;
    }
    case 'decrement': {
      enum0 = 1;
      break;
    }
    default: {
      if ((arg0) instanceof Error) {
        console.error(arg0);
      }
      
      throw new TypeError(`"${val0}" is not one of the cases of operation`);
    }
  }
  const ret = exports0Calc(enum0, toUint64(arg1));
  const retVal = BigInt.asUintN(64, ret);
  postReturn0(ret);
  return retVal;
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./component.core.wasm', import.meta.url));
    ({ exports: exports0 } = yield instantiateCore(yield module0, {
      'math:inc/inc': {
        inc: trampoline0,
      },
    }));
    postReturn0 = exports0.cabi_post_calc;
    exports0Calc = exports0.calc;
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;

export { calc,  }