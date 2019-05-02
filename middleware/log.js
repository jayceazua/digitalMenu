module.exports = (req, res, next) => {
    console.log('HEREEEE');    
    console.log(`${req.method} ${req.url}`);
    return next();
};
