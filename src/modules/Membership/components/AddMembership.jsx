import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useAddMembership from "../hooks/useAddMembership";

function InputField({ label, name, value, onChange, type = "text", error, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? "border-red-500 border" : ""}`}
      />
    </div>
  );
}

function AddMembership() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
  } = useAddMembership();

  return (
    <Container maxWidth="md" className="my-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">Membership Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              error={errors.type}
              placeholder="مثال: VIP, Standard"
            />

            <InputField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="أدخل السعر"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              error={errors.duration}
              placeholder="مثال: 1 Month, 1 Year"
            />

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="اكتب مزايا العضوية هنا..."
                className={`input min-h-[100px] ${errors.benefits ? "border-red-500 border" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

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
    </Container>
  );
}

export default AddMembership;
