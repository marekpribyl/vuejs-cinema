function checkFilterHandler(category, title, state) {
    if (state) {
        this[category].push(title);
    } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
            this[category].splice(index, 1);
        }
    }
}

export { checkFilterHandler };