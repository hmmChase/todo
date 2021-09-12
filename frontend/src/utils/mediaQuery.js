const breakpoints = [480, 768, 992, 1200];

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

export default mq;
