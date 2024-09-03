import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { initialQuery, RootState, setData, setQuery, setToken, setUser } from "../redux";
import { debounce } from "lodash";
import { auth } from "../firebase";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = debounce(async () => {
    console.log("logout");
    try {
      await signOut(auth);
      dispatch(setUser({}));
      dispatch(setToken(""));
      dispatch(setQuery(initialQuery));
      dispatch(setData([]));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, 1000);

  return (
    <header className="grow-0 p-4 w-full bg-black text-white dark:text-white dark:bg-black flex justify-between items-center">
      <div>
        <a href="/" className="hover:text-orange-400 hover:scale-105">
          Rijks Museum
        </a>
      </div>
      <div>
        {token && (
          <ul>
            <li
              onClick={handleLogout}
              className="cursor-pointer hover:text-orange-400 hover:scale-105">
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
