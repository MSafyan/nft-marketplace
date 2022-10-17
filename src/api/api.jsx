import axios, { getJwt } from './apiCore';
import { errorHandler } from '../helper/errorhandler';

export default class Api {
	// Create Fixed NFT API
	static createFixedNFT = async (data) => {
		try {
			const res = await axios.post(`/api/v1/nft/create`, data);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Buy Fixed NFT API
	static buyFixedNFT = async (id, data) => {
		try {
			const res = await axios.post(`/api/v1/nft/fixed/${id}`, data);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Buy Auction NFT API
	static buyAuctionNFT = async (id, data) => {
		try {
			const res = await axios.post(`/api/v1/nft/auction/${id}`, data);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Buy Open NFT API
	static buyOpenNFT = async (id, data) => {
		try {
			const res = await axios.post(`/api/v1/nft/open/${id}`, data);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// save/Unsaved NFT API
	static NFTSave = async (id) => {
		try {
			const res = await axios.put(`/api/v1/nft/save/${id}`);
			return res;
		} catch (error) {
			return error.response.data;
		}
	};

	// Get All NFTs API
	static getProfileMe = async () => {
		try {
			const res = await axios.get(`/api/v1/user/profile/me`);
			return res;
		} catch (error) {
			// errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get All NFTs API
	static jwtAsCookie = async (token) => {
		try {
			const res = await axios.get(`/api/v1/user/JwtAsCookie/${token}`);
			return res;
		} catch (error) {
			// errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get All NFTs API
	static getAllNFT = async () => {
		try {
			const res = await axios.get(`/api/v1/nft/all`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get Single NFT API
	static getSingleNFT = async (id) => {
		try {
			const res = await axios.get(`/api/v1/nft/${id}`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get Top Collector API
	static getTopCollectors = async () => {
		try {
			const res = await axios.get(`/api/v1/nft/collectors`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get All Collection API
	static getAllCollectionsNFT = async () => {
		try {
			const res = await axios.get(`/api/v1/nft/collections`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get Single Collection API
	static getSingleCollectionNFT = async (uid, cid) => {
		try {
			const res = await axios.get(`/api/v1/nft/collection/${uid}/${cid}`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Get Single Collection API
	static getMyCollectionNFT = async (id) => {
		try {
			const res = await axios.get(`/api/v1/nft/collection/my/${id}`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};

	// Active NFTs API
	static getActiveNFT = async () => {
		try {
			const res = await axios.get(`/api/v1/nft/active`);
			return res;
		} catch (error) {
			errorHandler(error.response.data);
			return error.response.data;
		}
	};
}
