import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/view/Home').default,
        },
        {
            path: '/artisan',
            name: 'artisan',
            component: require('@/view/ArtisanPage').default,
        },
        {
            path: '/entity',
            name: 'entity',
            component: require('@/view/EntityPage').default,
            children: [
                { path: '', redirect: 'file' },
                { path: 'cast', component: require('@/view/schema/CastList').default },
                { path: 'data', component: require('@/view/schema/DataList').default },
                { path: 'faker', component: require('@/view/schema/Faker').default },
                { path: 'field', component: require('@/view/schema/FieldList').default },
                { path: 'file', component: require('@/view/schema/FileList').default },
                { path: 'index', component: require('@/view/schema/IndexList').default },
                { path: 'property', component: require('@/view/schema/EntityProperty').default },
                { path: 'relation', component: require('@/view/schema/RelationList').default },
                { path: 'validation', component: require('@/view/schema/ValidationList').default },
            ],
        },
        {
            path: '/layer',
            name: 'layer',
            component: require('@/view/LayerPage').default,
        },
        {
            path: '/preset',
            name: 'preset',
            component: require('@/view/PresetPage').default,
        },
        {
            path: '/project',
            name: 'project',
            component: require('@/view/ProjectPage').default,
        },
        {
            path: '/oapi',
            name: 'oapi',
            component: require('@/view/OpenAPI').default,
        },
        {
            path: '/example',
            name: 'example',
            component: require('@/view/oapi/Example').default,
        },
        {
            path: '/header',
            name: 'header',
            component: require('@/view/oapi/HeaderPage').default,
        },
        {
            path: '/parameter',
            name: 'parameter',
            component: require('@/view/oapi/Parameter').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
