import ClockIn from "../../features/clockIn/component";
import SelectUser from "../../features/selectUser/component";
import { userStore } from "../../stores/user/store";

function Home() {
  const currentUser = userStore((state) => state.currentUser);

  return currentUser ? <ClockIn /> : <SelectUser />;
}

export default Home;
