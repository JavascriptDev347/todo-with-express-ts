// role.enum.ts
export const Role = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type Role = typeof Role[keyof typeof Role];  // "ADMIN" | "USER"