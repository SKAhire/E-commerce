// creating and saving the token in cookies
const sendShopToken = (shop, statusCode, res) => {
    const shopToken = shop.getJwtToken();

    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        
    };

    res.status(statusCode).cookie("shop_token", shopToken, options).json({
        success: true,
        shop,
        shopToken,
    });
};

module.exports = sendShopToken;