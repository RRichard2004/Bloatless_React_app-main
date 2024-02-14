let admin = {
    _admin: true,

    get admin() {
        return this._admin;
    },
    set admin(newValue) {
        this._admin = newValue;
    }
};

export default admin;