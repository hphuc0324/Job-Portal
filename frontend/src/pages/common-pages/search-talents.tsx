import SearchTalentBar from '@/components/search-talent-bar';
import useUserFilters from '@/hooks/use-user-filters';

function SearchTalentsPage() {
  const { name, location, minExperience, maxExperience, skills, page, limit, setSearchFilters } = useUserFilters();

  return (
    <div className="bg-[#f0f5f9] w-screen">
      <SearchTalentBar
        name={name}
        location={location}
        skills={['React', 'html', 'css', 'js', 'React', 'html', 'css', 'js']}
        setFilters={setSearchFilters}
      />
      <div className="p-8 w-full max-w-screen-xl mx-auto"></div>
    </div>
  );
}

export default SearchTalentsPage;
