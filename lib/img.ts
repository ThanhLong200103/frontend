import axios from "axios";

interface img {
    logo :File
}
export default async function img(props :img) {
    const {logo} = props;
    const cloudForm = new FormData();
      cloudForm.append("file", logo);
      cloudForm.append("upload_preset", "e-commerce");
      cloudForm.append("cloud_name", "dnte1n6ax");
      const cloudRes = await axios.post(
        "//api.cloudinary.com/v1_1/dnte1n6ax/image/upload",
        cloudForm,
      );
      const logoUrl = cloudRes.data.secure_url;
      return logoUrl
};
