export const getTypeOfCrypto = type => {
    const typeOfCryptoMap = {
        "crypto-wallet": "Crypto Wallet",
        "credit-card": "Credit Card",
        "debit-card": "Devit Card",
        "paypal": "PayPal"
    }

    const typeOfCrypto = Object.keys(typeOfCryptoMap).map(value => ({
        value,
        label: typeOfCryptoMap[value],
        selected: value === type ? "selected" : false
    }));

    return typeOfCrypto;
};