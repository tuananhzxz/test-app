export const uploadToCloud = async (pic: any) => {
    const cloud_name = "dwakn5uxr";
    const upload_present="ml_default";

    if (pic) {
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", upload_present);
        formData.append("cloud_name", cloud_name);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.log(error);
        }
    }
}