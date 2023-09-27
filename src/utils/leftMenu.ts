import { IMenuProps, MenuType } from '@/types/MenuRouter'
/**
 * 获取默认菜单选中keys
 * @param menuList
 * @returns
 */
export const getDefaultMenuSelectedKeys = (menuList: IMenuProps[]): string[] => {
  if (menuList[0].type === MenuType.menu) {
    return [String(menuList[0].id)]
  } else {
    if (menuList[0].type === MenuType.directory && menuList[0].children && menuList[0].children.length > 0) {
      return getDefaultMenuSelectedKeys(menuList[0].children)
    } else {
      return []
    }
  }
}

/**
 * 获取默认菜单展开目录的keys
 * @param menuList
 * @returns
 */
export const getDefaultMenuOpenKeys = (menuList: IMenuProps[]): string[] => {
  // 默认菜单选中的key数组
  const defaultMenuSelectedKeys: string[] = []

  const getOpenKeys = (menuList: IMenuProps[]) => {
    if (menuList[0].type === MenuType.directory) {
      defaultMenuSelectedKeys.push(String(menuList[0].id))
      if (menuList[0].children && menuList[0].children.length > 0) {
        getOpenKeys(menuList[0].children)
      }
    }
  }

  getOpenKeys(menuList)
  return defaultMenuSelectedKeys
}
