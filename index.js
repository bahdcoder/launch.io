const { cms } = require('@tensei/cms')
const { auth } = require('@tensei/auth')
const { media } = require('@tensei/media')
const { graphql } = require('@tensei/graphql')
const { markdown, mde } = require('@tensei/mde')
const { tensei, welcome, resource, text, textarea, belongsTo, boolean } = require('@tensei/core')

tensei()
    .root(__dirname)
    .resources([
        resource('Discussion')
            .fields([
                text('Title')
                    .hideOnUpdateApi()
                    .rules('required', 'max:50'),
                markdown('Body')
                    .rules('required'),
                belongsTo('User')
            ]),
        resource('Reply')
            .fields([
                textarea('Body'),
                belongsTo('User').rules('required'),
                belongsTo('Discussion').rules('required'),
                boolean('Best Reply').default(false)
            ])
    ])
    .plugins([
        welcome(),
        cms().plugin(),
        mde().plugin(),
        media().plugin(),
        auth().plugin(),
        graphql().plugin()
    ])
    .start()
    .catch(console.error)
