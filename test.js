function apples() {
    const a = 0;
    try {
        a = 3;
    } finally {
        return a;
    }
}

console.log(apples());
console.log("pineapples");