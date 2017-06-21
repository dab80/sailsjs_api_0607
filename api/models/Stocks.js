/**
 * Stocks.js
 *
 * @description :: This model allows access to the stock display database.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    co_name: {
      type: 'string',
      required: true
    },

    symbol: {
      type: 'string',
      minLength: 1,
      maxLength: 8,
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    wk_52_lo: {
      type: 'float'
    },

    wk_52_hi: {
      type: 'float'
    },

    avg_vol: {
      type: 'integer'
    },

    mkt_cap: {
      type: 'float'
    },

    pe_ratio: {
      type: 'float'
    },

    eps: {
      type: 'float'
    }
  }
};
