export default err => {
    if (err.name === "ValidationError") return Object.keys(err.errors).map(msg => msg = err.errors[msg].message);
    if (err.length) return err;
    return [err.message];
};