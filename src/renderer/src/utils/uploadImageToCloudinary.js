export const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'riee-consultorio'); // Verifica que el preset sea correcto

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dzizafv5s/image/upload`, // Reemplaza con tu cloud_name si es diferente
            formData
        );
        console.log('Cloudinary response:', response.data);
        return response.data.secure_url; // Devuelve la URL de la imagen subida
    } catch (error) {
        console.error('Error al subir imagen:', error.response?.data || error.message);
        throw error;
    }
};