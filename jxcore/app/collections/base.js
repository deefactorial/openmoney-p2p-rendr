var RendrBase = require('rendr/shared/base/collection');
var _ = require("underscore");

module.exports = RendrBase.extend({
    pouch: {
        listen: true,
        options: {
            query: {
                include_docs: true,
                fun: {
                    map: function(doc, emit) {
                        console.log("map:" + this.model.toLowerCase());
                        if (doc.type === this.model.toLowerCase()) {
                            emit(doc.name, null)
                        }
                    }
                }
            },
            changes: {
                include_docs: true,
                filter: function(doc) {
                    return doc._deleted || doc.type === this.model.toLowerCase();
                }
            }
        }
    }
    //,parse: function(result) {
    //    console.log("parse result:" + JSON.stringify(result));
    //    return _.pluck(result.rows, 'doc');
    //}
});

//module.exports = RendrBase.extend({});