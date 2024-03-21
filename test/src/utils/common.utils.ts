
const addable = ["number", "string"]

export function add<A, K>(a: A, b: K){
        return (a as any) + b as A | K;
}
