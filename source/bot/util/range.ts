export function range(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, i) => {
        return start + i
    })
}