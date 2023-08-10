export const screenRoute = [
    {
        path: '/screen',
        component: ()=> import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform'
        },
    }
]