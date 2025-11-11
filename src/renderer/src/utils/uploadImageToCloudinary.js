export const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'riee-consultorio');

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dzizafv5s/image/upload`,
            formData
        );
        console.log('Cloudinary response:', response.data);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error al subir imagen:', error.response?.data || error.message);
        throw error;
    }
};