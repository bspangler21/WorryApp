import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Problem } from "../types/Problem";
import { Worry } from "../types/Worry";

const apiURL = import.meta.env.DEV ? "http://localhost:4000/api" : "";

export const useFetchWorries = () => {
	// console.log("api url", apiURL);
	return useQuery<Worry[]>("worry", () => {
		return fetch(`${apiURL}/Worry`).then((res) => res.json());
	});
};

export const useFetchWorry = (_id: string) => {
	return useQuery<Worry>(["worry", _id], () => {
		return fetch(`${apiURL}/Worry/${_id}`).then((res) => res.json());
	});
};

export const useAddWorry = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Worry>(
		(worry) => axios.post(`${apiURL}/Worry`, worry),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("worry");
				nav("/worry");
			},
			onError: (error) => {
				if (error.response?.status === 405) {
					// Handle 405 error here
					console.error("405 Method Not Allowed");
				} else {
					// Handle other errors here
					console.error(error.message);
				}
			},
		}
	);
};

export const useUpdateWorry = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	// Will not work if golferId not included at the end of the URL
	return useMutation<AxiosResponse, AxiosError<Problem>, Worry>(
		(w) => axios.put(`${apiURL}/Worry/${w._id}`, w),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("worry");

				nav("/worry");
			},
		}
	);
};

export const useDeleteWorry = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Worry>(
		(w) => axios.delete(`${apiURL}/Worry/${w._id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("worry");
				nav(`/worry`);
			},
		}
	);
};
