import { AppliedContext, AppliedContextType } from '@/providers/AppliedProvider';
import { useContext } from 'react';

const useApplied = (): AppliedContextType => {
  if (!AppliedContext) {
    throw new Error('useApplied must be used within an AppliedProvider');
  }

  const applied = useContext(AppliedContext);

  if (!applied) {
    throw new Error('useApplied must be used within an AppliedProvider');
  }

  return applied;
};

export default useApplied;
