import colors from 'colors';

const logger = (req, res, next) => {
    const methodColors = {
        GET: 'green',
        POST: 'blue',
        PATCH: 'yellow'
    };

    const color = methodColors[req.method] || white;
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[
            color
        ]
    );
    next();
};

export default logger;