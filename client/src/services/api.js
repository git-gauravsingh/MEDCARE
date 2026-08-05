import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const aiServices = {

    // Symptoms Prediction
    predictSymptoms: async (symptomsList) => {
        const response = await apiClient.post("/predict/symptoms", {
            symptoms: symptomsList,
        });

        return response.data;
    },

    // Image Prediction
    predictImage: async (imageFile) => {

        const formData = new FormData();

        formData.append("file", imageFile);

        const response = await axios.post(
            `${API_BASE_URL}/predict/image`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },
};