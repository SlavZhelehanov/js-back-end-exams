export const getTypeOfPlatform = type => {
    const typeOfPlatformMap = {
        "": "-------",
        "PC": "PC",
        "PS4": "PS4",
        "PS5": "PS5",
        "XBOX": "XBOX"
    }

    const typeOfPlatform = Object.keys(typeOfPlatformMap).map(value => ({
        value,
        label: typeOfPlatformMap[value],
        selected: value === type ? "selected" : false
    }));

    return typeOfPlatform;
};