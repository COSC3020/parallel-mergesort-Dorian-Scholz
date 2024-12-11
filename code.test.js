const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');




describe('parallelMergeSort', () => 
  {
    test('should sort an array of numbers', async () => 
    {
        const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual([3, 9, 10, 27, 38, 43, 82]);
    });

    test('should sort an array with negative numbers', async () => 
    {
        const unsortedArray = [38, -27, 43, -3, 9, -82, 10];
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual([-82, -27, -3, 9, 10, 38, 43]);
    });

    test('should sort an array with repeated numbers', async () => 
    {
        const unsortedArray = [5, 3, 8, 5, 2, 8, 9, 2];
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual([2, 2, 3, 5, 5, 8, 8, 9]);
    });

    test('should handle an empty array', async () => {
        const unsortedArray = [];
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual([]);
    });

    test('should handle an array with one element', async () => 
    {
        const unsortedArray = [42];
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual([42]);
    });

    test('should handle a large array', async () => {
        const unsortedArray = Array.from({ length: 10000 }, (_, i) => 10000 - i); 
        const sortedArray = await parallelMergeSort(unsortedArray);
        expect(sortedArray).toEqual(unsortedArray.sort((a, b) => a - b)); 
    });
});
