# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

The span of the parallel mergesort program, in terms of worst case, is 
Θ(n). This is determined by analyzing the critical path, which is the longest sequence of dependent operations in the program's DAG (Directed Acyclic Graph). Each level of the DAG corresponds to one iteration of the outer loop, where the array is divided into independent chunks and merged in parallel. The time for each level is dominated by the longest single merge operation, which takes Θ(width), where width doubles at each level. Across log sub 2 (n) levels, the merges are sequentially dependent, as a merge at level i cannot begin until all merges at level i−1 are completed. Consequently, the span reflects the cumulative time for the dependent merges across levels, resulting in a worst-case span of Θ(n).
