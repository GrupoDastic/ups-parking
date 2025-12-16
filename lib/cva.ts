type VariantsConfig = {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, string>;
};

export function cva(
    base: string,
    config?: VariantsConfig
) {
    return (options?: Record<string, string | undefined>) => {
        let classes = base;

        const variants = config?.variants ?? {};
        const defaults = config?.defaultVariants ?? {};

        for (const key in variants) {
            const value =
                options?.[key] ??
                defaults[key];

            if (value && variants[key][value]) {
                classes += " " + variants[key][value];
            }
        }

        return classes;
    };
}
