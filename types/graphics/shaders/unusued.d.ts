declare const filter: () => {
    filter: import("pixi.js").Filter;
    uniforms: {
        time: number;
    };
} | undefined;
export default filter;
