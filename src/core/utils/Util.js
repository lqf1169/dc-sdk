/**
 * @Author: Caven
 * @Date: 2019-12-31 17:58:01
 */

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
  ''
)

/**
 *  Some of the code borrows from leaflet
 * https://github.com/Leaflet/Leaflet/tree/master/src/core
 */
class Util {
  /**
   * Generates uuid
   * @param prefix
   * @returns {string}
   */
  static uuid(prefix = 'D') {
    let uuid = []
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    let r
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = CHARS[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
    return prefix + '-' + uuid.join('')
  }

  /**

   * Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter.
   * @param dest
   * @param sources
   * @returns {*}
   */
  static merge(dest, ...sources) {
    let i, j, len, src
    for (j = 0, len = sources.length; j < len; j++) {
      src = sources[j]
      for (i in src) {
        dest[i] = src[i]
      }
    }
    return dest
  }

  /**
   *
   * @function trim(str: String): String
   * Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
   * @param {*} str
   *
   */
  static trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
  }

  /**
   * @function splitWords(str: String): String[]
   * Trims and splits the string on whitespace and returns the array of parts.
   * @param {*} str
   */
  static splitWords(str) {
    return this.trim(str).split(/\s+/)
  }

  /**
   * @function setOptions(obj: Object, options: Object): Object
   * Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`.
   * @param {*} obj
   * @param {*} options
   */
  static setOptions(obj, options) {
    if (!obj.hasOwnProperty('options')) {
      obj.options = obj.options ? Object.create(obj.options) : {}
    }
    for (let i in options) {
      obj.options[i] = options[i]
    }
    return obj.options
  }

  /**
   * @function checkPosition(position: Object): Boolean
   * Check position for validity
   * @param {*} position
   */
  static checkPosition(position) {
    return (
      position &&
      position.hasOwnProperty('_lng') &&
      position.hasOwnProperty('_lat') &&
      position.hasOwnProperty('_alt')
    )
  }

  /**
   * Checks positions for validity
   * @param positions
   * @returns {Boolean}
   */
  static checkPositions(positions) {
    return (
      positions && (typeof positions === 'string' || Array.isArray(positions))
    )
  }

  /**
   * Checks viewer for validity
   * @param viewer
   * @returns {Boolean}
   */
  static checkViewer(viewer) {
    return viewer && viewer.delegate && viewer.canvas
  }
}

export default Util
