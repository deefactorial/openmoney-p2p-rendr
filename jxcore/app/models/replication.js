/**
 * Created by deefactorial on 25/05/15.
 */

// Replication Model
// -----------------
var Base = require("./base");
// Our **Replication** model has an `url` attribute.
var Replication = Base.extend({
    defaults: {
        type: 'replication'
    }
});

module.exports = Replication;

module.exports.id = "Replication";