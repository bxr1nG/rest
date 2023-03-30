import type Every from "~/utils/strategies/ORM/Every";

function measureSelectTime() {
    return (
        _target: object,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value as typeof Every.select;

        descriptor.value = function (...args: Parameters<typeof Every.select>) {
            const [_1, _2, isBasis] = args;

            if (isBasis) {
                console.time("Query duration");
                const value = original.apply(this, args);
                console.timeEnd("Query duration");

                return value;
            } else {
                return original.apply(this, args);
            }
        };
    };
}
export default measureSelectTime;
