import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { CALL, FORK, PUT, TAKE } from "./SagaletEffects";
import { isPromise } from "./Is";

export const createSagaletMiddleware = () => {
  let sagaGenerator: () => Iterator<any>;

  // MiddlewareAPI的定义:  type MiddlewareAPI = { dispatch: Dispatch, getState: () => State }, 和store很像吧, 只是没有注册方法而已
  const sagaletMiddleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log(`szw sagalet middleware : ${JSON.stringify(action)}`);

    let outAction = next(action);


    function __next(gen: Iterator<any>, args: any, isError: boolean) {
      if (isError) {
        // @ts-ignore
        gen.throw(args);
        return;
      }

      const iteratorResult = gen.next(args);
      const { done, value } = iteratorResult;
      if (done) {
        return;
      }

      // = = = = = = = = 1. yield Promise = = = = = = = =
      if (isPromise(value)) {
        value.then((valueInPromise: any) => __next(gen, valueInPromise, false));
        return;
      }


      // = = = = = = = = 2. yield saga effect = = = = = = = =
      const effect = value[0];

      if (effect === TAKE) {
        console.log(`szw TAKE`); // this implementation is actually `takeEvery`
        const typeInterested = value[1];
        if (typeInterested === action.type) {
          const handlerFunc = value[2];
          const secondGenerator = handlerFunc(action);
          __next(secondGenerator, undefined, false);
          // TODO how to resume to the main generator after this is done?
        }
      } else if (effect === PUT) {
        console.log(`szw PUT`);
        const newAction = value[1];
        outAction = next(newAction);
        __next(gen, undefined, false);
      } else if (effect === CALL) {
        console.log("szw CALL");
        const func = value[1];
        const funcArgs = value[2];
        const funcResult = func.apply(null, funcArgs);
        __next(gen, funcResult, false);
      } else if (effect === FORK) {
        console.log("szw FORK");
        const func = value[1];
        const funcArgs = value[2];
        func.apply(null, funcArgs);
        __next(gen, undefined, false);
      }

    }

    const generator: Iterator<any> = sagaGenerator();
    __next(generator, undefined, false);

    return outAction;
  };

  sagaletMiddleware.run = (func: () => Iterator<any>) => {
    sagaGenerator = func;
  };

  return sagaletMiddleware;
};




