export const setTypes = data => {
    const typesCollection = {
        "---": "---",
        "Inner": "Inner",
        "Outer": "Outer",
        "Dwarf": "Dwarf"
    };

    return Object.keys(typesCollection).map(value => ({
        value,
        option: value,
        selected: typesCollection[value] === data ? "selected" : ''
    }));
};


export const setRings = data => {
    const typesCollection = {
        "---": "---",
        "Yes": "Yes",
        "No": "No"
    };

    return Object.keys(typesCollection).map(value => ({
        value,
        option: value,
        selected: typesCollection[value] === data ? "selected" : ''
    }));
};