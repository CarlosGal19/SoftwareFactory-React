import { useContext } from "react";
import { MajorContext } from "../context/MajorProvider";

const useMajor = () => {
    return useContext(MajorContext);
}

export default useMajor;
