import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

// USER CREATED
const syncUserCreation = inngest.createFunction(
  { id: "sync-from-clerk" },
  { event: "clerk/user.created" }, // ✅ FIX ADDED
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.create({
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  },
);

// USER DELETED
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" }, // ✅ FIX ADDED
  async ({ event }) => {
    await User.findByIdAndDelete(event.data.id);
  },
);

// USER UPDATED
const syncUserUpdation = inngest.createFunction(
  { id: "update-user" },
  { event: "clerk/user.updated" }, // ✅ FIX ADDED
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.findByIdAndUpdate(id, {
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  },
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
