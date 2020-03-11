export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

const IncrementBy = (n : number) : object => ({
    type: INCREMENT,
    n
});

const DecrementBy = (n : number) : object => ({
    type: DECREMENT, 
    n
});

export const counterActions = {
    IncrementBy,
    DecrementBy
}