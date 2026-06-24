import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

// USER CREATED
const syncUserCreation = inngest.createFunction(
  { id: "sync-from-clerk" },
  async ({ event }) => {
    if (event.name !== "clerk/user.created") return;

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
  async ({ event }) => {
    if (event.name !== "clerk/user.deleted") return;

    await User.findByIdAndDelete(event.data.id);
  },
);

// USER UPDATED
const syncUserUpdation = inngest.createFunction(
  { id: "update-user" },
  async ({ event }) => {
    if (event.name !== "clerk/user.updated") return;

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
