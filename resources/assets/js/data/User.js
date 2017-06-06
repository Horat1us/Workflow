/**
 * @property {Object} _userData
 * @property {Array} _userData.abilities
 * @property {string} _userData.email
 * @property {number} _userData.id
 */
class User {
    /**
     * @param userData
     */
    constructor(userData) {
        this.userData = userData;
    }

    /**
     * @param id
     * @param name
     * @param email
     * @param {Array} abilities
     */
    set userData({id, name, email, abilities}) {
        this._userData = {id, name, email, abilities};
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._userData.name;
    }

    /**
     * @returns {string}
     */
    get email() {
        return this._userData.email;
    }

    /**
     * @returns {number}
     */
    get id() {
        return this._userData.id;
    }

    /**
     * @param {string} permission
     * @returns {boolean}
     */
    can(permission) {
        return this._userData.abilities.includes(permission);
    }
}

export default User;