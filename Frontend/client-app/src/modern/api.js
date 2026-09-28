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

export async function nextProductId() {
    const res = await axios.get(`${API_BASE}/product/getmaxpid`);
    const list = res.data || [];
    const max = list.reduce((m, p) => Math.max(m, Number(p.pid) || 0), 0);
    return max + 1;
}

export async function saveProduct(obj) {
    const res = await axios.post(`${API_BASE}/product/saveproduct`, obj);
    return res.data;
}

export async function uploadProductImage(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/product/saveproductimage`, { method: "POST", body: form });
    if (!res.ok) throw new Error("Image upload failed");
    return res.text();
}

export async function toggleProductStatus(pid, status) {
    const res = await axios.put(`${API_BASE}/product/updateproductstatus/${pid}/${status}`);
    return res.data;
}

export async function fetchCustomers() {
    const res = await axios.get(`${API_BASE}/customer/getcustomerlist`);
    return res.data;
}

export async function vendorLogin(vuid, vupass) {
    const res = await axios.post(`${API_BASE}/vendor/login`, { vuid, vupass });
    return res.data;
}

export async function adminLogin(user, pass) {
    const res = await axios.post(`${API_BASE}/admin/login`, { user, pass });
    return res.data;
}
