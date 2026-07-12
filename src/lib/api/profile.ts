interface UpdateProfileInput {
  name?: string;
  phone?: string;
  university?: string;
  avatarUrl?: string;
}

interface ProfileApiResponse {
  success: boolean;
  message?: string;
}

export async function updateProfile(
  data: UpdateProfileInput,
): Promise<ProfileApiResponse> {
  const res = await fetch("/api/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
