export const getTextNodes = (container) => {
    return container.contents().filter(function() {
        if(this.nodeType === 3) {
            if(this.nodeValue.trim()) {
                return true;
            }
        }
        return false;
    });
}

export const getElementFromArray = (values, position = "FIRST") => {
    if(position === "LAST") {
        return values[values.length - 1];
    } else if(Number.isInteger(position)) {
        return values[position];
    }
    // First by default
    return values[0];
}