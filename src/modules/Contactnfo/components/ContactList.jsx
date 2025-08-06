import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import useContactDetails from "../hooks/useUpdateContact";

const ContactList = () => {
  const {
    email,
    setEmail,
    phone,
    location,
    setLocation,
    socialmedia,
    inputErrors,
    handlePhoneChange,
    addPhoneField,
    removePhoneField,
    handleSocialChange,
    addSocialField,
    removeSocialField,
    handleUpdate,
    isLoading,
  } = useContactDetails();

  // if (isLoading) return <LoadingCard />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold border-b pb-3 mb-4">
          Company Contact Information
        </h3>

        <div className="space-y-4">
          {/* Email */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Email</label>
            <input
              type="email"
              className={`input ${inputErrors.email ? "border-red-500" : ""}`}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="input-group">
            <label className="btn btn-input w-[7em]">Location</label>
            <input
              type="text"
              className="input"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Phone Numbers */}
          <div>
            <h2 className="mb-5 font-bold ">Phone Numbers</h2>
            {phone.map((p, idx, index) => (
              <div key={idx} className="input-group mb-4">
                <label className="btn btn-input w-[12em]">
                  Phone Numbere {idx + 1}
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className={`input w-full  ${inputErrors.phone ? "border-red-500" : ""}`}
                  value={p}
                  onChange={(e) => handlePhoneChange(idx, e.target.value)}
                />

                <div
                  className="relative group cursor-pointer"
                  onClick={() => removePhoneField(idx)}
                >
                  <i className="ki-filled ki-trash text-xl text-red-500 text-xl ml-4" />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneField}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded btn-sm"
            >
              Add Phone
            </button>

            {inputErrors.phone && (
              <p className="mt-1 text-sm text-red-500">
                Please fill all phone numbers
              </p>
            )}
          </div>

          {/* Social Media */}
          <div>
            <h2 className="mb-5 font-bold ">Social Media</h2>
            {socialmedia.map((s, idx) => (
              <div key={idx} className="flex gap-2 mb-4 items-center">
                <input
                  type="text"
                  placeholder="Platform"
                  className="input w-1/3"
                  value={s.platform}
                  onChange={(e) =>
                    handleSocialChange(idx, "platform", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="URL"
                  className="input w-2/3"
                  value={s.url}
                  onChange={(e) =>
                    handleSocialChange(idx, "url", e.target.value)
                  }
                />

                <div
                  className="relative group cursor-pointer"
                  onClick={() => removeSocialField(idx)}
                >
                  <i className="ki-filled ki-trash text-xl text-red-500 text-xl ml-4" />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSocialField}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded btn-sm"
            >
              Add Social Media
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        rtl={false}
      />
    </div>
  );
};

export default ContactList;
