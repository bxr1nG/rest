import type Base from "~/utils/strategies/ORM/Base";

class Factory<T extends typeof Base> {
    private readonly strategies: Record<string, T> = {};

    add(name: string, strategy: T) {
        this.strategies[name] = strategy;
    }

    select(name: string): T {
        const strategy = this.strategies[name];
        if (!strategy) {
            throw new Error("Strategy not found.");
        }
        return strategy;
    }
}

export default Factory;
