export const PREMIUM_KEY = "fashionfunks-premium-members-v2";
export const PREMIUM_EVENT = "fashionfunks:premium-updated";

export type PremiumMember = {
  name: string;
  email: string;
  joinedAt: string;
};

export function readPremiumMembers(): PremiumMember[] {
  try {
    return JSON.parse(window.localStorage.getItem(PREMIUM_KEY) ?? "[]") as PremiumMember[];
  } catch {
    return [];
  }
}

export function joinPremium(name: string, email: string) {
  const normalisedEmail = email.trim().toLocaleLowerCase();
  const members = readPremiumMembers();
  const existing = members.find((member) => member.email === normalisedEmail);
  if (existing) return { member: existing, duplicate: true };

  const member: PremiumMember = {
    name: name.trim(),
    email: normalisedEmail,
    joinedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(PREMIUM_KEY, JSON.stringify([member, ...members]));
  window.dispatchEvent(new CustomEvent(PREMIUM_EVENT));
  return { member, duplicate: false };
}
