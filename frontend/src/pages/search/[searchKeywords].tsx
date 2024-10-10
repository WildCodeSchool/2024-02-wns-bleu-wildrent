import { useParams } from "react-router-dom";
import SearchError from "./SearchError";
import Search from "./Search";

const SearchPage = () => {
  const { keyword } = useParams<{ keyword?: string }>();

  if (!keyword) {
    return <SearchError />;
  }

  return <Search keyword={keyword} />;
};

export default SearchPage;
