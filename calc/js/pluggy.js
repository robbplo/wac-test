const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

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


let exports0;
let exports1;
let exports2;
let exports3;
let exports3Calc;

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
  const ret = exports3Calc(enum0, toUint64(arg1));
  return BigInt.asUintN(64, ret);
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./pluggy.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./pluggy.core2.wasm', import.meta.url));
    const module2 = fetchCompile(new URL('./pluggy.core3.wasm', import.meta.url));
    const module3 = base64Compile('AGFzbQEAAAABBgFgAX4BfgJeBQVmbGFncwlpbnN0YW5jZTEDfwEFZmxhZ3MJaW5zdGFuY2UzA38BBmNhbGxlZQhhZGFwdGVyMAAABWZsYWdzCWluc3RhbmNlMgN/AQZjYWxsZWUIYWRhcHRlcjEAAAMDAgAABxcCCGFkYXB0ZXIwAAIIYWRhcHRlcjEAAwqXAQJKAQF+IwFBAXFFBEAACyMAQQJxRQRAAAsjAEF9cSQAIwBBfnEkACAAIwBBAXIkABAAIQEjAUF+cSQBIAEjAUEBciQBIwBBAnIkAAtKAQF+IwFBAXFFBEAACyMCQQJxRQRAAAsjAkF9cSQCIwJBfnEkAiAAIwJBAXIkAhABIQEjAUF+cSQBIAEjAUEBciQBIwJBAnIkAgs');
    const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
    const instanceFlags2 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
    const instanceFlags3 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
    ({ exports: exports0 } = yield instantiateCore(yield module0));
    ({ exports: exports1 } = yield instantiateCore(yield module1));
    ({ exports: exports2 } = yield instantiateCore(yield module3, {
      callee: {
        adapter0: exports0.dec,
        adapter1: exports1.inc,
      },
      flags: {
        instance1: instanceFlags1,
        instance2: instanceFlags2,
        instance3: instanceFlags3,
      },
    }));
    ({ exports: exports3 } = yield instantiateCore(yield module2, {
      $root: {
        dec: exports2.adapter0,
        inc: exports2.adapter1,
      },
    }));
    exports3Calc = exports3.calc;
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