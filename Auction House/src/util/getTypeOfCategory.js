export const getTypeOfCategory = type => {
    const typeOfCategoryMap = {
        "Real Estate": "Real Estate",
        "Vehicles": "Vehicles",
        "Furniture": "Furniture",
        "Electronics": "Electronics",
        "Other": "Other"
    }

    const typeOfCategory = Object.keys(typeOfCategoryMap).map(value => ({
        value,
        label: typeOfCategoryMap[value],
        selected: value === type ? "selected" : false
    }));

    return typeOfCategory;
};