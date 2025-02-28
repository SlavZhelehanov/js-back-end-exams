export const getTypeOfDisaster = type => {
    const typeOfDisasterMap = {
        "Wildfire": "Wildfire",
        "Flood": "Flood",
        "Earthquake": "Earthquake",
        "Hurricane": "Hurricane",
        "Drought": "Drought",
        "Tsunami": "Tsunami",
        "Other": "Other"
    }

    const typeOfDisaster = Object.keys(typeOfDisasterMap).map(value => ({
        value,
        label: typeOfDisasterMap[value],
        selected: value === type ? "selected" : false
    }));

    return typeOfDisaster;
};