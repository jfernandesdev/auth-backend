import { useAuth } from "./useAuth";

type UseCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({permissions, roles} : UseCanParams) {
  const { user, isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return false;
  }

  //every = possui todas as permissões
  if(permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission)
    })

    if(!hasAllPermissions) {
      return false;
    }
  }

  //some = possui pelo menos um dos papeis
  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role)
    })

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}