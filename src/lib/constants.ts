export const DEFAULT_LIMIT = 24;
export const LIMIT_OPTIONS = [24, 36, 48] as const;

export const SORT_OPTIONS = {
    DEFAULT: 'default',
    ALPHABETICAL: 'alphabetical',
    TRACK_COUNT: 'track_count',
    LAST_UPDATED: 'last_updated',
} as const;

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
} as const;

export const SORT_LABELS = {
    [SORT_OPTIONS.DEFAULT]: 'Default Order',
    [SORT_OPTIONS.ALPHABETICAL]: 'Alphabetical',
    [SORT_OPTIONS.TRACK_COUNT]: 'Number of Tracks',
    [SORT_OPTIONS.LAST_UPDATED]: 'Last Updated',
} as const;
