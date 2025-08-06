// useContactDetails.js
import { useEffect, useState } from "react";
import {
  useUpdateContactMutation,
  useGetAllContactQuery,
} from "../../../rtk/ContactApi/contactApi";
import { toast } from "react-toastify";

const useContactDetails = () => {
  const { data: contacts, isLoading: loadingContacts } =
    useGetAllContactQuery();
  const [updateContact, { isLoading: updating }] = useUpdateContactMutation();

  const contact = contacts?.data?.[0];

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState([]);
  const [location, setLocation] = useState("");
  const [socialmedia, setSocialmedia] = useState([]);

  const [inputErrors, setInputErrors] = useState({
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (contact) {
      setEmail(contact.email || "");
      setPhone(contact.phone || []);
      setLocation(contact.location || "");
      setSocialmedia(contact.socialmedia || []);
    }
  }, [contact]);

  //methods for manage the states in jsx page like delete,update the data
  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...phone];
    updatedPhones[index] = value;
    setPhone(updatedPhones);
  };

  const addPhoneField = () => {
    setPhone([...phone, ""]);
  };

  const removePhoneField = (index) => {
    const updatedPhones = phone.filter((_, i) => i !== index);
    setPhone(updatedPhones);
  };

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...socialmedia];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setSocialmedia(updatedSocials);
  };

  const addSocialField = () => {
    setSocialmedia([...socialmedia, { platform: "", url: "" }]);
  };

  const removeSocialField = (index) => {
    const updated = socialmedia.filter((_, i) => i !== index);
    setSocialmedia(updated);
  };

  //for Update the data in server
  const handleUpdate = async () => {
    const errors = {
      email: !email.trim() || !/^\S+@\S+\.\S+$/.test(email),
      phone: phone.some((p) => !p.trim()),
    };

    setInputErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    const formData = { email, phone, location, socialmedia };
    //
    try {
      const res = await updateContact({
        id: contact?._id,
        patch: formData,
      }).unwrap();
      if (res) toast.success("Information Updated successfully!");
    } catch (err) {
      toast.error("Failed to Update Information!");

      console.error("Error updating contact:", err);
    }
  };

  return {
    contacts,
    email,
    setEmail,
    phone,
    setPhone,
    location,
    setLocation,
    socialmedia,
    setSocialmedia,
    inputErrors,
    handlePhoneChange,
    addPhoneField,
    removePhoneField,
    handleSocialChange,
    addSocialField,
    removeSocialField,
    handleUpdate,
    isLoading: loadingContacts || updating,
  };
};

export default useContactDetails;
