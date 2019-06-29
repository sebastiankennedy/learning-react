export default [
    {
        key: '/admin',
        icon: 'pie-chart',
        title: 'Admin'
    },
    {
        key: '/login',
        icon: 'desktop',
        title: 'Login'
    },
    {
        key: '/admin/dashboard',
        icon: 'inbox',
        title: 'Inbox'
    },
    {
        key: '/mail',
        icon: 'mail',
        title: 'Mail',
        children: [
            {
                key: 'm/ail-1',
                title: 'Mail - 1'
            },
            {
                key: '/mail-2',
                title: 'Mail - 2'
            }
        ]
    },
    {
        key: '/category',
        icon: 'caret-down',
        title: 'Category',
        children: [
            {
                key: '/category-1',
                title: 'Category - 1'
            },
            {
                key: '/category-2',
                icon: 'caret-down',
                title: 'Category - 2',
                children: [
                    {
                        key: '/category-2-1',
                        title: 'Category - 2 - 1'
                    },
                    {
                        key: '/category-2-2',
                        title: 'Category - 2 - 2'
                    }
                ]
            }
        ]
    },
    {
        key: '/admin/ui/loading',
        icon: 'loading',
        title: 'Loading',
    }
];