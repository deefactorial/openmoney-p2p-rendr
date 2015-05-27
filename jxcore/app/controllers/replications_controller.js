/**
 * Created by deefactorial on 25/05/15.
 */
module.exports = {
    index: function(params, callback) {
        var spec = {
            collection: {collection: 'Replications', params: params}
        };
        this.app.fetch(spec, function(err, result) {
            callback(err, result);
        });
    },

    show: function(params, callback) {
        var spec = {
            model: {model: 'Replication', params: params}
        };
        this.app.fetch(spec, function(err, result) {
            callback(err, result);
        });
    }
};
