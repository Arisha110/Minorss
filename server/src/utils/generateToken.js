const jwt = require('jsonwebtoken');

const generateToken = (res, statusCode, user, isUser) => {
    console.log(`isUser: ${isUser}`);

    try {
        let accessToken = '';
        let refreshToken = '';
        // let text1 = '';
        // let text2 = '';

        if (isUser) {
            accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '10m'
            });
            refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            // text1 = 'userToken';
            // text2='refreshToken'
        } else {
            accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '10m'
            });
            refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            // text1 = 'providerToken';
            // text2='refreshToken'
        }

        if (isUser)
            return res.status(statusCode).json({
                _id: user._id,
                name: user.name,
                phoneNumber: user?.phoneNumber,
                email: user.email,
                userToken: accessToken,
                refreshToken: refreshToken
            });

        return res.status(statusCode).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user?.address,
            phoneNumber: user?.phoneNumber,
            rating: user?.rating,
            isAuthorized: user.isAuthorized,
            providerToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = generateToken;
