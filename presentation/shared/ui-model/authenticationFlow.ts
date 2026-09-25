import { Home } from '@/presentation/pages/home/home';
import { Login } from '@/presentation/pages/auth';

export enum AuthStepEnum {
  LOGIN = 'LOGIN',
  INITIAL = 'INITIAL',
}

export const AUTH_STEP_COMPONENTS: Record<AuthStepEnum, React.ComponentType> = {
  [AuthStepEnum.LOGIN]: Login,
  [AuthStepEnum.INITIAL]: Home,
};
