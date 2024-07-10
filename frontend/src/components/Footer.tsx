import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-lightBlue gap-4 p-4 mt-4 text-white text-xs">
      <Link to="#">Lien 1</Link>
      <Link to="#">Lien 2</Link>
      <Link to="#">Lien 3</Link>
      <Link to="#">Lien 4</Link>
    </div>
  );
}

export default Footer;
