import useFavorite from '@/hooks/use-favorite';

function HomePage() {
  const { favoriteList } = useFavorite();

  console.log(favoriteList);

  return <>Home page</>;
}

export default HomePage;
