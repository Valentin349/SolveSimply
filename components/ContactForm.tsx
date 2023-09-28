import { ChangeEvent, FormEvent, useState } from "react";

export default function ContactForm() {
  const backgroundColor = "bg-darkGrey";
  const textColor = "text-white";
  const primaryColor = "text-darkPink";
  const focusColor = "focus:ring-lightPink";
  const hoverColor = "hover:bg-lightPink";

  const postURL = "https://formsubmit.co/business@solvesimply.co.uk";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
        <div className="w-[88vw] max-w-2xl md:w-[40vw] mt-14 md:mt-20 mx-auto px-4">
          <h2 className={`text-3xl font-semibold mb-4 ${primaryColor}`}>
            Contact Us
          </h2>
          <form
            action={postURL}
            method="POST"
            className="space-y-4"
          >
            <input type="text" name="_honey" className="hidden" />
            <div>
              <label
                htmlFor="name"
                className={`${textColor} text-lg font-medium`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full ${backgroundColor} z-10 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 ${focusColor} ${textColor}`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`${textColor} text-lg font-medium`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${backgroundColor} z-10 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 ${focusColor} ${textColor}`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className={`${textColor} text-lg font-medium`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us when and how we can help you!"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className={`w-full ${backgroundColor} z-10 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 ${focusColor} ${textColor}`}
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-darkPink text-white py-2 px-6 rounded-lg ${hoverColor} focus:outline-none focus:ring-2 ${focusColor} ${textColor}`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
  );
}
