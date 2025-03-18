import favoriteApi from '@/apis/favorite-api';
import { Job } from '@/types/dtos';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export interface FavoriteContextType {
  favoriteList: string[];
  toggleFavorite: (jobId: string) => void;
}

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

function FavoriteProvider({ userId, children }: { userId?: string; children: ReactNode }) {
  const [favoriteList, setFavoriteList] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addToFavorite = async (userId: string, jobId: string) => {
    try {
      const res = await favoriteApi.addToFavorite(userId, jobId);
      setFavoriteList((prev) => [...prev, jobId]);
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const toggleFavorite = (jobId: string) => {
    if (!userId) {
      const rediredUrl = encodeURIComponent(window.location.pathname);
      return <Navigate to={`/auth/login?redirect=${rediredUrl}`} />;
    }

    if (favoriteList.includes(jobId)) {
      removeFromFavorite(userId, jobId);
    } else {
      addToFavorite(userId, jobId);
    }
  };

  const removeFromFavorite = (userId: string, jobId: string) => {
    try {
      favoriteApi.removeFromFavorite(userId, jobId);
      setFavoriteList((prev) => prev.filter((id) => id !== jobId));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setFavoriteList([]);
        return;
      }

      try {
        const res = await favoriteApi.getFavoriteList(userId);

        const idList = res.data.data?.map((item: Job) => item.id);

        setFavoriteList(idList);
      } catch (error: AxiosError | any) {
        console.error(error);
        setFavoriteList([]);
      }
    };

    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteList));
  }, [favoriteList]);

  return <FavoriteContext.Provider value={{ favoriteList, toggleFavorite }}>{children}</FavoriteContext.Provider>;
}

export default FavoriteProvider;
