import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Search from "./Search";

const SearchPage = () => {
  const { keyword } = useParams<{ keyword?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword && !localStorage.getItem("startDate") && !localStorage.getItem("endDate")) {
      navigate("/");
    }
  }, [keyword, navigate]);

  return <Search keyword={keyword || ""} />;
};

export default SearchPage;
