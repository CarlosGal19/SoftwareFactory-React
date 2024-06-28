import { useContext } from "react";
import { MajorContext } from "../context/MajorProvider";

const useMajor = () => {
    const { major, setMajor } = useContext(MajorContext);

    return { major, setMajor }
}

export default useMajor;
