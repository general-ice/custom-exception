const $customExceptionSymbol = Symbol("custom-exception");

type CustomExceptionType = symbol

interface CustomException<P> {
    readonly type: CustomExceptionType;
    readonly payload?: P;
    readonly __id: symbol;
}

const makeCustomException = <P = undefined>(
    type: CustomExceptionType,
    payload?: P
): CustomException<P> => ({
    type,
    payload,
    __id: $customExceptionSymbol
});

interface CustomExceptionConstructor<P = any> {
    readonly type: CustomExceptionType;
    new: (payload?: P) => CustomException<P>;
}

const createException = (typeDescription?: string, payload?: any): CustomExceptionConstructor => {
    const type = Symbol(typeDescription)
    return {
        type,
        new: payload => makeCustomException(type, payload)
    }
};

const isCustomException = (e: CustomException<any>): e is CustomException<any> => {
    return e.__id === $customExceptionSymbol;
};

type HandlerFn = (payload?: any) => void

interface DeclarativeHandlerMap {
    default: HandlerFn

    //Next line ignored by TS, because current ts version have a problem with symbol keys. It doesn't affect to code execution.
    // @ts-ignore
    [key: CustomExceptionType]: HandlerFn
}

const declarativeHandleException = (
    e: CustomException<any>,
    handleMap: DeclarativeHandlerMap,
) => {
    if (!isCustomException(e))
        return;

    // Same problem with usage symbol as index. It is just TS problem.
    // @ts-ignore
    const necessaryHandler = handleMap[e.type]

    if (necessaryHandler) {
        necessaryHandler(e.payload)
        return
    }

    const defaultCase = handleMap.default
    defaultCase && defaultCase()

};
