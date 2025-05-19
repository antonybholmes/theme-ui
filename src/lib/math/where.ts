/**
 * Returns the indices of an array that pass a filtering criteria. Useful
 * for getting the indices in a dataframe that you want to keep etc.
 *
 * @param data  an array of data to filter
 * @param f     a function that maps a value in the array to true or false to
 *              determine if it should be kept
 * @returns     the indices where the applied function to the array is true.
 */
export function where<T>(data: T[], f: (x: T) => boolean): number[] {
  return data
    .map((v, vi) => [v, vi] as [T, number])
    .filter(a => f(a[0]!))
    .map(a => a[1]!)
}

//reorder(dfs, order, (df, id)=>df.id===id)
