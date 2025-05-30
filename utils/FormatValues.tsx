

// Utility function to format a numeric value for display
export default function formatValue(value: number | null | undefined): string {
    // If value is null, undefined, or not a number, return placeholder
    if (value === null || value === undefined || isNaN(Number(value))) return '--';
    // Otherwise, round to nearest integer and return as string
    return Math.round(Number(value)).toString();
}