class Storage {
    constructor(storageName = 'gameScoreboard', initialValue = '[]') {
        this.storageName = storageName;

        // Check localStorage for previous games
        if(!localStorage.getItem(storageName)) {
            // If none, create new storage item
            localStorage.setItem(storageName, initialValue);
        }
    }

    // Load previous game data from localStorage
    getData() {
        return JSON.parse(localStorage.getItem(this.storageName));
    }

    // Update data in localStorage
    update(data) {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}

export default Storage;