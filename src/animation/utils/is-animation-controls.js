var isAnimationControls = function (v) {
    return typeof v === "object" && typeof (v).start === "function"
};

export { isAnimationControls };
