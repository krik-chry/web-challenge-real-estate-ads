import { LuBuilding, LuGrid2X2, LuHouse } from 'react-icons/lu'

export const PropertyTypeIcons = {
  APARTMENT: <LuBuilding className="w-8 h-8" />,
  DETACHED_HOUSE: <LuHouse className="w-8 h-8" />,
  PLOT: <LuGrid2X2 className="w-8 h-8" />,
} as const
