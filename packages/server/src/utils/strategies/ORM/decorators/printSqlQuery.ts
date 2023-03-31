import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";

function printSqlQuery() {
    return (
        _target: object,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value as (
            values: Array<string>,
            source: QuerySource,
            criteria?: QueryCriteria,
            _isBasis?: boolean
        ) => string;

        descriptor.value = function (
            ...args: [
                values: Array<string>,
                source: QuerySource,
                criteria?: QueryCriteria,
                _isBasis?: boolean
            ]
        ) {
            const [values, _1, _2, isBasis] = args;

            if (isBasis) {
                const value = original.apply(this, args);

                console.info(`Query SQL:\n${value}`);
                if (values.length) {
                    console.info(`Query params: ${values.join(", ")}`);
                }

                return value;
            } else {
                return original.apply(this, args);
            }
        };
    };
}

export default printSqlQuery;
