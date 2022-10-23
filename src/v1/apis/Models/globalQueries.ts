export interface Query {
    model: string;
    table: string;
    value?: string | number;
    uniqueColumn?: string;
    uniqueValue?: string | number;
}
