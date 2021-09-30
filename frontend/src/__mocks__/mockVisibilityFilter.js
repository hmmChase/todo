import { createMockReactiveVar } from '../createMockReactiveVar';
import { VisibilityFilters } from '../../models/VisibilityFilter';

export const mockVisibilityFilter = createMockReactiveVar(
  VisibilityFilters.SHOW_ALL
);
