// @unocss-include

export interface MenuItemInterface {
    label?: string
    icon?: string
    to?: string
    url?: string
    target?: string
    separator?: boolean
    disabled?: boolean
    style?: string
    class?: string
    badge?: string
    item?: MenuItemInterface
    items?: MenuItemInterface[]
    command?: (arg0: { originalEvent: any; item: MenuItemInterface }) => void
}

export const getNavigationMenu = function (): MenuItemInterface[] {
    const { t } = useI18n();

    const menu: MenuItemInterface[] = [
        {
            label: t('menu.home'),
            item: {
                icon: 'pi-fw pi-home', to: '/',
            },
        },
    ];

    menu.push({
        label: t('menu.withdrawal'),
        item: {
            icon: 'pi-fw pi-home', to: '/withdrawal',
        },
    });

    return menu;
};
