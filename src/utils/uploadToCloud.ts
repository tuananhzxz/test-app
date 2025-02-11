export const uploadToCloud = async (pic: File): Promise<string> => {
    const cloud_name = "dwakn5uxr";
    const upload_preset = "test_upload";

    if (!pic) {
        throw new Error('No file provided');
    }

    try {
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", upload_preset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            {
                method: "POST",
                body: formData,
                // Thêm headers để kiểm tra CORS
                headers: {
                    'Accept': 'application/json',
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary error:', errorData);
            throw new Error(`Upload failed: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('Upload success:', data); // Log để debug

        if (!data.secure_url) {
            throw new Error('No URL in response');
        }

        return data.secure_url; 
        
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};