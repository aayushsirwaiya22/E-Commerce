import axios from "axios";
import { API_BASE } from "../config";

export { API_BASE };

export const productImage = (picname) => `${API_BASE}/product/getproductimage/${picname}`;
export const customerImage = (picname) => `${API_BASE}/customer/getimage/${picname}`;
export const vendorImage = (picname) => `${API_BASE}/vendor/getimage/${picname}`;

export async function fetchProducts() {
    const res = await axios.get(`${API_BASE}/product/showproduct`);
    return res.data;
}

export async function fetchProduct(pid) {
    const res = await axios.get(`${API_BASE}/product/showproductstatus/${pid}`);
    return res.data;
}

export async function fetchCategories() {
    const res = await axios.get(`${API_BASE}/productcatg/show`);
    return res.data;
}

export async function fetchVendorProducts(vid) {
    const res = await axios.get(`${API_BASE}/product/showproductbyvendor/${vid}`);
    return res.data;
}

export async function fetchBills() {
    const res = await axios.get(`${API_BASE}/bill/billshow`);
    return res.data;
}

export async function fetchVendors() {
    const res = await axios.get(`${API_BASE}/vendor/getvendorcount`);
    return res.data;
}
