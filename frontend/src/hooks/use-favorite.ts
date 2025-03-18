import { FavoriteContext } from '@/providers/FavoriteProvider';
import { useContext } from 'react';
import { FavoriteContextType } from '@/providers/FavoriteProvider';

const useFavorite = (): FavoriteContextType => {
  if (!FavoriteContext) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }

  const favorite = useContext(FavoriteContext);

  if (!favorite) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }

  return favorite;
};

export default useFavorite;
