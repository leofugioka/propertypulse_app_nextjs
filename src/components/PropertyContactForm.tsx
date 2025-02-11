"use client";

import { useActionState, startTransition, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaPaperPlane } from "react-icons/fa";
import * as actions from "@/actions";
import { toast } from "react-toastify";

interface PropertyContactFormProps {
  propertyId: string;
  propertyOwner: string;
}

const PropertyContactForm = ({ propertyId, propertyOwner }: Readonly<PropertyContactFormProps>) => {
  const { data: session } = useSession();
  const [formState, action, isPending] = useActionState(actions.addMessage.bind(null, { propertyId, propertyOwner }), { errors: {} });

  useEffect(() => {
    if (formState.success) {
      toast.success("Message sent successfully");
    }
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  if (formState.success) {
    return <div className="text-green-500">Your message has been sent</div>;
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              defaultValue={session.user?.name ?? ""}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              defaultValue={session.user?.email ?? ""}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            {formState.errors._form ? <div>{formState.errors._form.join(" and ")}</div> : null}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <div>Sending Message...</div>
              ) : (
                <div className="flex flex-row items-center">
                  <FaPaperPlane className="mr-2" /> Send Message
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
