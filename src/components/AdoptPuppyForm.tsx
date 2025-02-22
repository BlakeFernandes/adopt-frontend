import { PuppyWithId } from "@/app/page";
import { useState } from "react";

export default function AdoptPuppyForm({ puppy }: { puppy: PuppyWithId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/adopt/${puppy._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-24 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">
        Interested in Adopting {puppy.name}?
      </h3>
      {submitted ? (
        <p className="text-green-500">
          Your adoption request has been submitted!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
            className="border p-2 rounded"
          />
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            required
            className="border p-2 rounded"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Why do you want to adopt?"
            required
            className="border p-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
}
