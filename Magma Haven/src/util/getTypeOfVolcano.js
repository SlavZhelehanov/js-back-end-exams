export const getTypeOfVolcano = type => {
    const typeOfVolcanoMap = {
        "Supervolcanoes": "Supervolcanoes",
        "Submarine": "Submarine",
        "Subglacial": "Subglacial",
        "Mud": "Mud",
        "Stratovolcanoes": "Stratovolcanoes",
        "Shield": "Shield"
    }

    const typeOfVolcano = Object.keys(typeOfVolcanoMap).map(value => ({
        value,
        label: typeOfVolcanoMap[value],
        selected: value === type ? "selected" : false
    }));

    return typeOfVolcano;
};