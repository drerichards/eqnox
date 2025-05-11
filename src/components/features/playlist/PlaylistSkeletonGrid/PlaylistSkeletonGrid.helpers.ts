export const generateSkeletonCards = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        key: i
    }));
}; 