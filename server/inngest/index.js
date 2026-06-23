import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

// FUNCTIONS
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.create({
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    });
  },
);

const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await User.findByIdAndDelete(event.data.id);
  },
);

const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.findByIdAndUpdate(id, {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    });
  },
);

// 👇 IMPORTANT EXPORT
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
