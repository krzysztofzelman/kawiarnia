"use server";

import { createServerClient } from "./server";
import { revalidatePath } from "next/cache";

export async function submitContact(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData,
) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "Wszystkie pola są wymagane." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Podaj poprawny adres email." };
  }

  if (name.length < 2) {
    return { success: false, error: "Imię musi mieć co najmniej 2 znaki." };
  }

  if (message.length < 10) {
    return { success: false, error: "Wiadomość musi mieć co najmniej 10 znaków." };
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("Supabase insert error (contact):", error);
    return { success: false, error: "Wystąpił błąd. Spróbuj ponownie później." };
  }

  revalidatePath("/#contact");
  return { success: true, error: null };
}

export async function subscribeNewsletter(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData,
) {
  const email = formData.get("email")?.toString().trim();

  if (!email) {
    return { success: false, error: "Podaj adres email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Podaj poprawny adres email." };
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("newsletter_signups").insert({
    email,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Ten email jest już zapisany!" };
    }
    console.error("Supabase insert error (newsletter):", error);
    return { success: false, error: "Wystąpił błąd. Spróbuj ponownie później." };
  }

  return { success: true, error: null };
}
