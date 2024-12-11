const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) 
  
{
    
    function parallelMergeSort(array)
      {
        const numWorkers = 4; // Adjust based on available cores
        const chunkSize = Math.ceil(array.length / numWorkers);
        const promises = [];

        // Divide array into chunks and process in parallel
        for (let i = 0; i < numWorkers; i++)
          {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, array.length);
            const chunk = array.slice(start, end);

            promises.push(new Promise((resolve, reject) => 
              {
                const worker = new Worker(__filename, { workerData: chunk });
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => 
                  {
                    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
                });
            }));
        }

        
        return Promise.all(promises).then((sortedChunks) => 
          {
            while (sortedChunks.length > 1) 
            {
                const left = sortedChunks.shift();
                const right = sortedChunks.shift();
                sortedChunks.push(merge(left, right));
            }
            return sortedChunks[0];
        });
    }

   
    function merge(left, right) 
    {
        const result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) 
        {
            if (left[i] <= right[j]) 
            {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }

        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    
    const array = [38, 27, 43, 3, 9, 82, 10];
    parallelMergeSort(array).then(sortedArray => 
    {
        console.log("Sorted Array:", sortedArray);
    }).catch(console.error);

} else 
{
   
    const array = workerData;

    
    function mergeSort(array) 
    {
        if (array.length <= 1) return array;
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));
        return merge(left, right);
    }

   
    parentPort.postMessage(mergeSort(array));
}
