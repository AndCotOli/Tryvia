class StateManager {
  /**
   * @param {String} name - the name for the store.
   * @param {Object} [initialValues] - the initial key-value pairs.
   */
  constructor(name, initialValues = {}) {
    if (!window.states) window.states = {};
    if (!name) throw new Error('Stores must have a name!');
    window.states[name] = initialValues;
    this.state = window.states[name];
  }

  /**
   * Adds/Modifies a key-value pair to the state.
   * @param {String} key - The key for the pair.
   * @param {*} value  - The value of the pair.
   */
  set(key, value = null) {
    if (!key) throw new Error('A key is needed!');
    this.state[key] = value;
  }

  /**
   * Returns the value for an specified key.
   * @param {String} key - The key of the pair.
   */
  get(key) {
    if (!key) throw new Error('A key is needed!');
    return this.state[key];
  }
}

export default StateManager;
