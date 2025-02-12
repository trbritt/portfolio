import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import SectionWrapper  from "../utils/section";
import { slideIn } from "@/utils/motion";
import { argtype } from "@/utils/constants";

interface FormState {
    name: string;
    email: string;
    message: string;
  }

  const Contact: React.FC<argtype> = ({isMobile}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
  
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      emailjs
        .send(
          'service_7j68kob',
          'template_tetz7jn',
          {
            from_name: form.name,
            to_name: "Tristan Britt",
            from_email: form.email,
            to_email: "tristan.britt@mail.mcgill.ca",
            message: form.message,
          },
          'SR-yfRRk2iss-w4qh'
        )
        .then(
          () => {
            setLoading(false);
            alert("Thank you. I will get back to you as soon as possible.");
            setForm({ name: "", email: "", message: "" });
          },
          (error) => {
            setLoading(false);
            console.error(error);
            alert("Ahh, something went wrong. Please try again.");
          }
        );
    };
  
    return (
      <>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className={`flex-[0.75] bg-quartary border-outline border-2 p-8 rounded-2xl ${isMobile ? 'mx-3' : 'mx-10'} mt-10 mb-20`}
        >
          <p className="text-4xl font-bold text-zinc-100 ">Get in touch</p>
          <h3 className="text-3xl font-semibold text-zinc-10 mb-10">Contact.</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8 tracking-tight">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary/70 text-secondary rounded-lg border-outline/45 border-2 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary/70 text-secondary rounded-lg border-outline/45 border-2 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary/70 text-secondary rounded-lg border-outline/45 border-2 font-medium"
              />
            </label>
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl border-outline/45 border-2 w-fit text-white font-bold shadow-md shadow-primary"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>
      </>
    );
  };
  
  export default SectionWrapper(Contact, "contact");