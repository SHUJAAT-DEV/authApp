import { NavigationKeys } from "../../constants/navigation_keys";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/login";
import RegisterScreen from "../../screens/signup";

const protectedScreens = [
  {
  name: NavigationKeys.Screen.Home,
  component: HomeScreen,
  headerShown: false,
}]

const guestScreens = [ {
  name: NavigationKeys.Screen.Login,
  component: LoginScreen,
  headerShown: false,
}, {
  name: NavigationKeys.Screen.Register,
  component: RegisterScreen,
  headerShown: false,
}];
const useRoutes = () => {
  return { protectedScreens, guestScreens };
}
export default useRoutes;
