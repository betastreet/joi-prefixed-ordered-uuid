module.exports = function extension(Joi) {
    return Joi.extend({
        base: Joi.any(),
        name: 'pouuid',
        language: {
            pouuid: 'needs to be a prefixed-ordered-uuid prefixed with {{q}}',
        },
        rules: [
            {
                name: 'pouuid',
                params: {
                    q: Joi.alternatives([Joi.string().optional()]),
                },
                validate(params, value, state, options) {
                    function binaryToPrefixedUuid(buff, orderedUuidPrefixLength) {
                        try {
                            if (orderedUuidPrefixLength) {
                                const prefix = buff.slice(0, orderedUuidPrefixLength || 2);
                                const uid = buff.slice(orderedUuidPrefixLength || 2);
                                return prefix.toString() + uid.toString('hex');
                            }
                            return buff.toString('hex');
                        } catch (err) {
                            throw new Error('Invalid binary UUID to convert.');
                        }
                    }

                    function prefixedUuidRegex(orderedUuidPrefix) {
                        return new RegExp('^' + (orderedUuidPrefix || '') + '[a-z0-9]{32}$');
                    }

                    let testingValue = value;

                    if (Buffer.isBuffer(value)) {
                        try {
                            testingValue = binaryToPrefixedUuid(value,
                                (params.q ? params.q.length : 0));
                        } catch (err) {
                            return this.createError('pouuid.pouuid', { v: value, q: params.q }, state, options);
                        }
                    }

                    const regex = prefixedUuidRegex(params.q);

                    const isValid = testingValue && testingValue.match(regex);

                    if (!isValid) {
                        return this.createError('pouuid.pouuid', { v: value, q: params.q }, state, options);
                    }

                    return value;
                },
            },
        ],
    });
};
