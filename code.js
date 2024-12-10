async function parallelMergesort(array) 
{
    let n = array.length;

    for (let width = 1; width < n; width *= 2)
    {
        const tasks = [];

        for (let i = 0; i < n; i += 2 * width) 
        {
            const left = i;
            const mid = Math.min(i + width, n);
            const right = Math.min(i + 2 * width, n);

         
            tasks.push(mergeAsync(array, left, mid, right));
        }

        
        await Promise.all(tasks);
    }

    return array;
}

async function mergeAsync(array, left, mid, right)
  {
    return new Promise((resolve) => 
      {
        const merged = [];
        let i = left,
            j = mid;

        while (i < mid && j < right)
        {
            if (array[i] <= array[j]) 
            {
                merged.push(array[i++]);
            } else {
                merged.push(array[j++]);
            }
        }

        while (i < mid) 
        {
            merged.push(array[i++]);
        }

        while (j < right) 
        {
            merged.push(array[j++]);
        }

        for (let k = 0; k < merged.length; k++) 
        {
            array[left + k] = merged[k];
        }

        resolve(); 
    });
}
