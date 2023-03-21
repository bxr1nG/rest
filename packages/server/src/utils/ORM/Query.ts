import type Rows from "~/types/Rows";

class Query<T extends Rows> {
    private readonly table: string;
    private readonly conditions: Array<[string, Array<T[keyof T]>]>;
    private readonly orders: Array<[keyof T, "asc" | "desc"]>;
    private interval: [number, number] | undefined;

    constructor(table: string) {
        this.table = table;

        this.conditions = [];
        this.orders = [];
    }

    where(expression: string, values: Array<T[keyof T]>) {
        this.conditions.push([expression, values]);
        return this;
    }

    order(column: keyof T, order: "asc" | "desc") {
        this.orders.push([column, order]);
        return this;
    }

    range(limit: number, offset: number) {
        this.interval = [limit, offset];
        return this;
    }

    build() {
        return {
            source: {
                table: this.table
            },
            criteria: {
                where: this.conditions,
                order: this.orders,
                range: this.interval
            }
        };
    }
}

export default Query;
