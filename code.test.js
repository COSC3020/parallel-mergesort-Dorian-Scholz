const assert = require("assert");

// Import the parallelMergesort function
const { parallelMergesort } = require("./parallelMergesort");

async function testParallelMergesort() 
{
    console.log("Running tests...");

    const cases = [
        { input: [5, 2, 9, 1, 5, 6], expected: [1, 2, 5, 5, 6, 9] },
        { input: [0], expected: [0] },
        { input: [9, 7, 5, 3, 1], expected: [1, 3, 5, 7, 9] },
        { input: [], expected: [] },
        { input: [3, 3, 3, 3], expected: [3, 3, 3, 3] },
    ];

    for (const { input, expected } of cases) 
    {
        const result = await parallelMergesort([...input]);
        assert.deepStrictEqual(result, expected);
        console.log(`Test passed for input: [${input}]`);
    }

    console.log("All tests passed!");
}

// Run the tests
testParallelMergesort().catch((error) => 
{
    console.error("Test failed:", error);
});
