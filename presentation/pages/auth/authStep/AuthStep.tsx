'use client';

import {
  AuthStepEnum,
  AUTH_STEP_COMPONENTS,
} from '@/presentation/shared/ui-model/authenticationFlow';
import { useAuth } from '@/presentation/shared/lib/auth-context';

export function AuthStep() {
  const { isAuthenticated } = useAuth();
  const currentStep = isAuthenticated
    ? AuthStepEnum.INITIAL
    : AuthStepEnum.LOGIN;
  const StepComponent = AUTH_STEP_COMPONENTS[currentStep];

  return <StepComponent />;
}
