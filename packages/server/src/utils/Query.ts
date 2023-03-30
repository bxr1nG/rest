import type Rows from "~/types/Rows";
import type Include from "~/types/ORM/Include";

class Query<T extends Rows> {
    private readonly table: string;
    private readonly conditions: Array<[string, Array<T[keyof T]>]>;
    private readonly orders: Array<[keyof T, "asc" | "desc"]>;
    private interval: [number, number] | undefined;
    private readonly includes: Array<Include>;
    private readonly includesMany: Array<Include>;

    constructor(table: string) {
        this.table = table;

        this.conditions = [];
        this.orders = [];
        this.includes = [];
        this.includesMany = [];
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

    include(params: Include) {
        this.includes.push(params);
        return this;
    }

    includeMany(params: Include) {
        this.includesMany.push(params);
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
                range: this.interval,
                include: this.includes,
                includeMany: this.includesMany
            }
        };
    }
}

export default Query;
