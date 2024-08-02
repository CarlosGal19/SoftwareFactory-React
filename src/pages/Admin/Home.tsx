import { FC } from "react";
import Instructions from "../../components/AdminDashboard/Instructions";
import Statistics from "../../components/AdminDashboard/Statistics";

const Home: FC = () => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100">
        <Instructions />
        <Statistics />
    </div>
);
}

export default Home
