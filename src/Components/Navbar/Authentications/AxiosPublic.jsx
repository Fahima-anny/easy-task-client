import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://easy-task-server-murex.vercel.app/"
})

const useAxiosPublic = () => {
    return axiosPublic ;
};

export default useAxiosPublic;