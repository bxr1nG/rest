import type Every from "~/utils/strategies/ORM/Every";

function newQueryTime() {
    return (
        _target: object,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value as typeof Every.select;

        descriptor.value = function (...args: Parameters<typeof Every.select>) {
            const [source, _2, isBasis] = args;
            if (isBasis) {
                console.info(
                    `[${new Date().toLocaleString()}] New query for table ${
                        source.table
                    }`
                );
            }
            return original.apply(this, args);
        };
    };
}

export default newQueryTime;
