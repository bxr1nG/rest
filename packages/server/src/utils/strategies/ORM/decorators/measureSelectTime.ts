import type Every from "~/utils/strategies/ORM/Every";

function measureSelectTime() {
    return (
        _target: object,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value as typeof Every.select;

        descriptor.value = async function (
            ...args: Parameters<typeof Every.select>
        ) {
            const [_1, _2, isBasis] = args;

            if (isBasis) {
                const start = process.hrtime();
                const value = await original.apply(this, args);
                const end = process.hrtime(start);
                const time = (end[0] * 1000000000 + end[1]) / 1000000; // convert first to ns then to ms
                console.info(`Query duration: ${time}ms`);

                return value;
            } else {
                return original.apply(this, args);
            }
        };
    };
}
export default measureSelectTime;
