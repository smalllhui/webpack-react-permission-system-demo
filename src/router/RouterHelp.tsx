import { IMenuProps, MenuType } from '@/types/MenuRouter'
import { RouteRecordRaw } from '@/router'

/**
 * @description: 根据菜单列表生成路由列表
 * @param {SystemMenuProp} menuList 菜单列表
 * @return {RouteRecordRaw[]} routeList
 */
export const transformRouter = (menuList: IMenuProps[]): RouteRecordRaw[] => {
  /**
   * @description: 根据菜单列表生成路由并添加到路由列表
   * @param {IMenuProps} menus 菜单列表
   * @param {string} paths 当前路由菜单的嵌套路径
   * @param {RouteRecordRaw} routeList 路由列表
   */
  const generateRoute = (menus: IMenuProps[], paths: string[], routeList: RouteRecordRaw[]) => {
    menus.forEach(menu => {
      if (menu.type === MenuType.directory) {
        // 目录
        paths.push(menu.menuName)
        // 继续生成菜单
        generateRoute(menu.children ? menu.children : [], paths, routeList)
      } else if (menu.type === MenuType.menu) {
        // 菜单

        // 按钮权限
        const authList: string[] = []

        menu.children?.forEach((btnMenu: IMenuProps) => {
          if (btnMenu.type === MenuType.button) {
            // 按钮
            authList.push(btnMenu.authCode || '')
          }
        })

        // 生成路由
        const routerItem: RouteRecordRaw = {
          requireAuth: true,
          path: menu.path as string,
          componentPath: menu.componentPath as string,
          meta: {
            paths: [...paths, menu.menuName],
            title: menu.menuName,
            authList,
          },
        }

        // 添加到路由表中
        routeList.push(routerItem)
      }
    })
  }

  const routeList: RouteRecordRaw[] = []
  if (Array.isArray(menuList) && menuList.length > 0) {
    menuList.forEach(menu => {
      generateRoute([menu], [], routeList)
    })
  }
  return routeList
}
